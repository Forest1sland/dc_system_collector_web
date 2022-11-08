import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import login from '../views/login.vue'
import register from '../components/register.vue'
import transferCase from '../components/case.vue'
import qrcode from '../utils/qrcode.vue'
import choicePoint from '../components/choicePoint.vue'
import tube from '../components/tube.vue'
import person from '../components/person.vue'
import profile from '../components/profile.vue'
import view from '../views/view.vue'
import useStore from '../stores/store'


const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
            // defineAsyncComponent(() => import('../components/login.vue'))
        }, {
            path: '/view',
            name: 'view',
            component: view,
            children: [
                {
                    path: '/register',
                    name: 'register',
                    component: register
                },
                {
                    path: '/case',
                    name: 'case',
                    component: transferCase
                }, {
                    path: '/qrcode',
                    name: 'qrcode',
                    component: defineAsyncComponent({
                        // 加载函数
                        loader: () => import('../utils/qrcode.vue'),

                        // 加载异步组件时使用的组件
                        loadingComponent: qrcode,
                        // 展示加载组件前的延迟时间，默认为 200ms
                        delay: 200,

                        // 加载失败后展示的组件
                        errorComponent: `<div>error<div>`,
                        // 如果提供了一个 timeout 时间限制，并超时了
                        // 也会显示这里配置的报错组件，默认值是：Infinity
                        timeout: 3000
                    })
                }, {
                    path: '/choicePoint',
                    name: 'choicePoint',
                    component: choicePoint
                }, {
                    path: '/tube',
                    name: 'tube',
                    component: tube
                }, {
                    path: '/person',
                    name: 'person',
                    component: person
                }, {
                    path: '/profile',
                    name: 'profile',
                    component: profile
                }, {
                    path: '/choiceTubeType',
                    name: 'choiceTubeType',
                    component: () => import('../components/choiceTubeType.vue')
                }, {
                    path: '/caseList',
                    name: 'caseList',
                    component: () => import('../components/caseList.vue')
                }
            ]
        }
    ],

})


router.beforeEach((to, from) => {
    const store = useStore()
    if (to.name == 'register')
        return true
    if (
        !store.collectorId && to.path !== '/'
    ) {
        return { path: '/' }
    }
})
export default router
