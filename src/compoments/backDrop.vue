<template lang="pug">
transition(name='fade')
    .backdrop(v-if='show' :style="{backgroundColor:backgroundColor}")
        slot
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        backgroundColor: {
            type: String,
            default: 'rgba(0,0,0,.4)'
        }
    },
    // data() {
    //     return {
    //         active: false
    //     }
    // },
    // methods: {
    //     show() {
    //         this.active = true
    //     },
    //     hide() {
    //         this.active = false
    //     }

    // }
}
</script>
<style lang="stylus" scoped>
.fade-enter-active
.fade-leave-active
    transition: opacity .1s linear
.fade-enter
.fade-leave-to 
    opacity: 0
.backdrop 
    position absolute
    top 0
    left 0
    z-index 11
    width 100%
    height 100%
    background-color rgba(0,0,0,.4)
    display flex
    justify-content center
    align-items center
    // visibility hidden
    // opacity 0
    // -webkit-transition opacity .1s linear
    // transition opacity .1s linear
.backdrop.active 
    visibility visible
    opacity 1
</style>
