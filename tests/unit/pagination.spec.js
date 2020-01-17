import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Pagination from '@/components/pagination/pagination.vue'
chai.use(sinonChai)


Vue.component(Pagination.name, Pagination)

describe('Pagination.vue', () => {
  it('存在', () => {
    expect(Pagination).to.be.exist
  })

  it('基础的分页器，接受totalPages和current',(done)=>{
    const wrapper = mount(Pagination, {
      propsData: {
        totalPages: 5,
        current: 2
      },
    })

    setTimeout(()=>{
      let len = wrapper.findAll('.z-view-pagination-item').length
      expect(len).to.equal(5)
      expect(wrapper.find('.z-view-pagination-item-active').text()).to.equal('2')
      wrapper.destroy()
      done()
    })
  })



  it('可以翻页',(done)=>{
    let callback = sinon.fake()
    const wrapper = mount(Pagination, {
      propsData: {
        totalPages: 5,
        current: 2,
      },
      listeners: {
        'update:current': callback
      }
    })
    // done()
    setTimeout(()=>{
      let span =  wrapper.findAll('.z-view-pagination-item').at(3)
      span.trigger('click')
      expect(callback).to.have.been.calledWith(3)
      wrapper.destroy()
      done()
    },2)
  })


})
