import Vue from 'vue';
import Button from './Button';
import Icon from './Icon';
import ButtonGroup from './Button-group';
import chai from 'chai';
import spies from 'chai-spies';

Vue.component('g-button', Button);
Vue.component('g-icon', Icon);
Vue.component('g-button-group', ButtonGroup);

new Vue({
    el: '#app',
    data: {
        loading1: true,
        loading2: false,
        loading3: false
    }
})

const expect = chai.expect;
chai.use(spies)

// 单元测试
{
    // 构造函数
    const Constructor = Vue.extend(Button);

    // 添加实例
    const vm = new Constructor({
        // 传递属性
        propsData: {
            icon: 'setting'
        }
    })

    // 挂载到页面
    vm.$mount();

    // 选择 button 中的 use 元素
    let useElement = vm.$el.querySelector('use');
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq('#i-setting');

    // 页面中移出
    vm.$el.remove();

    // 内存清楚
    vm.$destroy();
}
{
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting',
            loading: true
        }
    })
    vm.$mount();
    let useElement = vm.$el.querySelector('use');
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq('#i-loading');
    vm.$el.remove();
    vm.$destroy();
}
{
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting'
        }
    })
    vm.$mount(div);
    let svg = vm.$el.querySelector('svg');
    let {order} = window.getComputedStyle(svg);
    expect(order).to.eq('1');
    vm.$el.remove();
    vm.$destroy();
}
{
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting',
            iconPosition: 'right'
        }
    })
    vm.$mount(div);
    let svg = vm.$el.querySelector('svg');
    let {order} = window.getComputedStyle(svg);
    expect(order).to.eq('2');
    vm.$el.remove();
    vm.$destroy();
}
{
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting'
        }
    })
    vm.$mount();
    let spy = chai.spy(function () {});
    vm.$on('click', spy);
    let button = vm.$el;
    button.click();
    expect(spy).to.have.been.called();
}