import app from './view/app.vue'
import menu from './view/menu.vue'
import game from './view/game.vue'
import intro from './view/intro.vue'
import role from './view/role.vue'
import about from './view/about.vue'
import FastClick from 'fastclick'

FastClick.attach(document.body)

const routes = [{
        path: '/game',
        component: game
    }, {
        path: '/intro',
        component: intro
    }, {
        path: '/role',
        component: role
    }, {
        path: '/about',
        component: about
    },
    {
        path: '/',
        component: menu
    }
]


const router = new VueRouter({
    routes
})

new Vue({
    //el: '#app',
    render: h => h(app),
    router
}).$mount('#app')