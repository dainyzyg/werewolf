import install from './install.js'
import app from './view/app.vue'
import menu from './view/menu.vue'
import game from './view/game.vue'
import intro from './view/intro.vue'
import role from './view/role.vue'
import about from './view/about.vue'
import FastClick from 'fastclick'

Vue.use(install)

// window.addEventListener('load', function () {
//     FastClick.attach(document.body);
// }, false)

// function preventDefault(e) {
//     e.preventDefault()
// }
// document.body.addEventListener('touchstart', preventDefault)
// document.body.addEventListener('touchend', preventDefault)


// 一些兼容性代码
/* for iOS 10, users can now pinch-to-zoom even when a website sets user-scalable=no in the viewport. */
document.documentElement.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault()
    }
}, false)
/* iOS Safari - Disable double click to zoom */
let lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', (e) => {
    let now = (new Date()).getTime()
    if (now - lastTouchEnd < 300) {
        e.preventDefault()
    }
    lastTouchEnd = now
}, false)

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