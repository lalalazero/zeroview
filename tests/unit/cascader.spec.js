import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Cascader from '@/components/cascader/cascader.vue'
import CascaderItem from '@/components/cascader/cascader-item.vue'

chai.use(sinonChai)

describe('Cascader.vue', () => {
  it('存在', () => {
    expect(Cascader).to.be.exist
  })
  it('接受 selected 属性', (done) => {
    Vue.component('z-view-cascader', Cascader)
    Vue.component('z-view-cascader-item', CascaderItem)
    const wrapper = mount(Cascader, {
      propsData: {
        options: [
          {
            id: '1',
            label: '四川',
            children: [
              {
                id: '1-1',
                label: '成都市',
                children: [
                  {
                    id: '1-1-1',
                    label: '高新区'
                  },
                  {
                    id: '1-1-2',
                    label: '锦江区'
                  },
                  {
                    id: '1-1-3',
                    label: '金牛区'
                  },
                ]
              },
              {
                id: '1-2',
                label: '泸州市',
                children: [
                  {
                    id: '1-2-1',
                    label: '纳西区'
                  },
                  {
                    id: '1-2-2',
                    label: '江阳区'
                  },
                  {
                    id: '1-3-3',
                    label: '龙马谭区'
                  },
                ]
              },
            ]
          },
          {
            id: '2',
            label: '重庆市',
            children: [
              {
                id: '2-1',
                label: '渝中区'
              },
              {
                id: '2-2',
                label: '北培区'
              }
            ]
          }
        ],
        selected: [ { "id": "1", "label": "四川" }, { "id": "1-2", "label": "泸州市" }, { "id": "1-2-2", "label": "江阳区" } ]
      },

    })
    let cascaderTrigger = wrapper.find('.z-view-cascader-trigger')
    cascaderTrigger.trigger('click')
    Vue.nextTick(() => {
      let items = wrapper.findAll('.active')
      expect(items.length).to.equal(3)
      expect(items.at(0).find('span').text()).to.equal('四川')
      expect(items.at(1).find('span').text()).to.equal('泸州市')
      expect(items.at(2).find('span').text()).to.equal('江阳区')
      done()
    })
  })


})
