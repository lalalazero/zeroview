import chai, { expect } from 'chai'
import Vue from 'vue'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Upload from '@/components/upload/upload.vue'
import http from '@/components/upload/http.js'
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.runtimeCompiler = true

describe('Upload.vue', ()=>{
  it('存在', ()=>{
    expect(Upload).to.be.exist
  })

  it('可以上传一个文件', (done)=>{
    let stub = sinon.stub(http, 'post').callsFake((url, options) => {
      setTimeout(()=>{
        options.success(JSON.stringify({id:'1234'}))
      },1000)
    })
    const wrapper = mount(Upload, {
      propsData: {
        name: 'file',
        action: 'xxxx',
        parseResponse: (resp) => `/preview/1234`,
        fileList: []
      },
      slots: {
        default: '<button id="btn">click me</button>'
      },
      listeners: {
        'update:fileList': (newFileList) => {
          wrapper.setProps({ fileList: newFileList })
        },
        'uploaded': () => {
          let useList = wrapper.findAll('use')
          expect(useList.length).to.equal(2)
          let icon1 = useList.at(0).element
          expect(icon1.getAttribute('xlink:href')).to.equal('#icon-download')
          let icon2 = useList.at(1).element
          expect(icon2.getAttribute('xlink:href')).to.equal('#icon-error')
          let span = wrapper.find('.z-view-uploader-fileList-itemName')
          expect(span.text()).to.equal('hello.txt')
          expect(span.classes().includes('z-view-uploader-status-success')).to.equal(true)
          // 恢复原来的 http.post 方法
          stub.restore()
          done()
        }
      }
    })
    wrapper.find('#btn').trigger('click')
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['hellohello'], 'hello.txt')
    // 利用 dataTransfer 给 input.files 赋值
    let dataTransfer = new DataTransfer()
    dataTransfer.items.add(file1)
    input.files = dataTransfer.files
    wrapper.find('input[type="file"]').trigger('change')

    let use = wrapper.find('use').element
    expect(use.getAttribute('xlink:href')).to.equal('#icon-loading')
  })

  // it('test http', ()=>{
  //   // 由于之前有 stub.restore() 因此这里仍旧是真实的 http.post() 方法的调用
  //   http.post()
  // })
})
