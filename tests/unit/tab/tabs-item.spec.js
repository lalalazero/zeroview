import chai, { expect } from 'chai'
import Vue from 'vue'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Tabs from '@/components/tab/tabs.vue'
import TabsHead from '@/components/tab/tabs-head.vue'
import TabsBody from '@/components/tab/tabs-body.vue'
import TabsItem from '@/components/tab/tabs-item.vue'
import TabsPane from '@/components/tab/tabs-pane.vue'
import { isIterable } from 'core-js'
chai.use(sinonChai)

Vue.component('z-tabs', Tabs)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)

describe('TabsItem.vue', () => {
    it('存在', () => {
        expect(TabsItem).to.be.exist
    })

    it('接受 name 属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'xxx'
            }
        }).$mount()
        // console.log(vm.$el.outerHTML)
        expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
    })

    it('接受 disabled 属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true,
                name: 'xxx'
            }
        }).$mount()
        // console.log(vm.$el.outerHTML)
        const callback = sinon.fake()
        vm.$on('click', callback)
        vm.$el.click()
        expect(vm.$el.classList.contains('disabled')).to.eq(true)
        expect(callback).to.have.not.been.called
    })
})
