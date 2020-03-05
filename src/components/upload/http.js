const http = function (method = '', url, options) {
  let xhr = new XMLHttpRequest()
  xhr.onload = ()=>{
    options.success && options.success(xhr.response)
  }
  xhr.onerror = ()=>{
    options.fail && options.fail(xhr, xhr.status)
  }
  xhr.open(method.toLowerCase(), url)
  xhr.send(options.data)
}

export default {
  get(url, options){
    return http('GET',url,options)
  },
  post(url, options){
    return http('POST',url,options)
  }
}
