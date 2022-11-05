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
                    component: qrcode
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
