import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Carousel from '@/components/carousel/carousel.vue'
import CarouselItem from '@/components/carousel/carousel-item.vue'
chai.use(sinonChai)


Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)

describe('Carousel.vue', () => {
  it('存在', () => {
    expect(Carousel).to.be.exist
  })

  it('接受 carousel-item，默认展示第一个',(done)=>{
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlay: false
      },
      slots: {
        default: `
        <z-view-carousel-item name="a">
          <div class="box">a</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="b">
          <div class="box">b</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="c">
          <div class="box">c</div>
        </z-view-carousel-item>
        `
      }
    })

    setTimeout(()=>{
      let len = wrapper.findAll('.box').length
      expect(len).to.equal(1)
      expect(wrapper.find('.box').text()).to.equal('a')
      wrapper.destroy()
      done()
    })
  })

  it('接受 selected',(done)=>{
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlay: false,
        selected: 'b'
      },
      slots: {
        default: `
        <z-view-carousel-item name="a">
          <div class="box">a</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="b">
          <div class="box">b</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="c">
          <div class="box">c</div>
        </z-view-carousel-item>
        `
      }
    })

    setTimeout(()=>{
      let len = wrapper.findAll('.box').length
      expect(len).to.equal(1)
      expect(wrapper.find('.box').text()).to.equal('b')
      wrapper.destroy()
      done()
    })
  })

  it('click 切换',(done)=>{
    let callback = sinon.fake()
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlay: false,
      },
      slots: {
        default: `
        <z-view-carousel-item name="a">
          <div class="box">a</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="b">
          <div class="box">b</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="c">
          <div class="box">c</div>
        </z-view-carousel-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })

    setTimeout(()=>{
      wrapper.find('span[data-name="2"]').trigger('click')
      expect(callback).to.have.been.calledWith('c')
      wrapper.destroy()
      done()
    })
  })

  it('会自动播放',(done)=>{
    let callback = sinon.fake()
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlay: true,
        autoPlayDelay: 20,
      },
      slots: {
        default: `
        <z-view-carousel-item name="a">
          <div class="box">a</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="b">
          <div class="box">b</div>
        </z-view-carousel-item>
        <z-view-carousel-item name="c">
          <div class="box">c</div>
        </z-view-carousel-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    // done()
    setTimeout(()=>{
      expect(callback).to.have.been.calledWith('b')
      wrapper.destroy()
      done()
    },21)
  })


})
