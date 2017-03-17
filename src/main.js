import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueResource);

const Foo = {
    template: '<div>foo</div>'
};
const Bar = {
    template: '<div>bar</div>'
};
const Adc = {
    template: '<div>adc</div>'
};
const routes = [
    {
        path: '/',
        component: Foo
    }, {
        path: '/goods',
        component: Foo
    }, {
        path: '/ratings',
        component: Bar
    }, {
        path: '/seller',
        component: Adc
    }
];

const router = new VueRouter({linkActiveClass: 'active', routes});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
