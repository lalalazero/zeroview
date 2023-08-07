const Config = require('markdown-it-chain')
const mdContainer = require('markdown-it-container')
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
let config = new Config()

config.options.html(true).end().plugin('containers').use(setCustomContainer).end()

let configMd = config.toMd()
overWriteFenceRule(configMd)

function setCustomContainer(md) {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s+(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        let str1 = description ? `<template slot="description">${md.render(description)}</template>` : `<template slot="description">description</template>`
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : 'content';
        return `<demo-block>
        ${str1}
       <!-- zViewDemo ${content} zViewDemo -->
        `;
      }
      return '</demo-block>';
    }
  })

}

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}
// 除开 script 和 style 的部分
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}



function overWriteFenceRule(md) {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info === 'html' && isInDemoContainer) {
      return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}
function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
}

function compileComponent(template, script) {
  const options = {
    source: `<div>${template}</div>`,
    filename: 'xxx',
    compiler
  }
  const compiled = compileTemplate(options)

  // tips
  if (compiled.tips && compiled.tips.length > 0) {
    compiled.tips.forEach(tip => console.warn(tip))
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
      compiled.errors.map(e => `  - ${e}`).join('\n') +
      '\n'
    );
  }

  script = script.trim()
  if (script) {
    script = script.replace(/export\s+default/, 'const compiledcomponentExport = ')
  } else {
    script = 'const compiledcomponentExport = {}'
  }

  return `(function(){
    ${compiled.code}
    ${script}
    return {
      render,
      staticRenderFns,
      ...compiledcomponentExport
    }
  })()`
}


module.exports = function (resource) {
  let output = []
  let styles = []
  let content = configMd.render(resource)
  const startTag = '<!-- zViewDemo'
  const startTagLen = startTag.length
  const endTag = 'zViewDemo -->'
  const endTagLen = endTag.length
  let id = 0
  let start = 0
  let componentString = ''
  let commentStart = content.indexOf(startTag)
  // output.push(content.slice(0, commentStart)) // 这是把 ```html fence 之前的输出
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))
    let commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const template = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    const style = stripStyle(commentContent)
    styles.push(style)
    let compiledComponent = compileComponent(template, script)
    componentString += `demo${id}:${compiledComponent},`
    output.push(`<template slot='source'><demo${id} /></template>`)  // 这是编译好的demo组件，一个这样的组件对应一个 :::demo 除开 css 的部分

    // 继续处理下一个 :::demo 块
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }
  output.push(content.slice(start))  // 这是把 <style>和 </demo-block> 闭合标签输出
  let pageScript = `<script>
    export default {
      name: 'component-doc',
      components: {
        ${componentString}
      },
    }
  </script>
  <style>
    ${styles.join('')}
  </style>`

  let pageContent = `
    <template>
      <div class='component-doc'>
        ${output.join('')}
      </div>
    </template>
  `
  return `${pageContent}${pageScript}`

}
