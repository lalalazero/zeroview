import chai, { expect } from 'chai'
import Vue from 'vue'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Upload from '@/components/upload/upload.vue'
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.runtimeCompiler = true

describe('Upload.vue', ()=>{
  it('存在', ()=>{
    expect(Upload).to.be.exist
  })

  it('可以上传一个文件', (done)=>{
    const wrapper = mount(Upload, {
      propsData: {
        name: 'file',
        action: '/asubmit',
        parseResponse: ()=>{ console.log('parseRespons 被调用了')}
      },
      slots: {
        default: '<button id="btn">click me</button>'
      }
    })
    console.log(wrapper.html())
    wrapper.find('#btn').trigger('click')
    console.log(wrapper.html())
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['hello'], 'hello.txt')
    let file2 = new File(['world'], 'world.txt')
    // 利用 dataTransfer 给 input.files 赋值
    let dataTransfer = new DataTransfer()
    dataTransfer.items.add(file1)
    dataTransfer.items.add(file2)
    input.files = dataTransfer.files
    console.log('done')
    done()
  })
})
