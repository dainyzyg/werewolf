import alert from './compoments/alert.vue'

export default {
    install(Vue, options) {
        Vue.prototype.$alert = getAlert()
    }
}

function getAlert() {
    let bd = {
        vm: null,
        show(option) {
            if (!bd.vm) {
                console.log('getAlert')
                let el = document.createElement('div')
                el.setAttribute('v-alert', '')
                document.body.appendChild(el)
                bd.vm = new Vue(alert)
                bd.vm.$mount('[v-alert]')
            }
            bd.vm.show(option)
        },
        hide(option) {
            if (!bd.vm) {
                bd.vm.hide(option)
            }
        }
    }
    return bd
}