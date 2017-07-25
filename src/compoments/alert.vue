<template lang="pug">
BackDrop(:show='backDropShow' backgroundColor="#ddd")
    .popup(:class=`{'popup-active':popupShow,'popup-hidden':!popupShow}`)
        .head {{option.title}}
        .body {{option.content}}
        .buttons
            .btn.blue(@click.stop='hide') 确定
</template>
<script>
import BackDrop from '../compoments/backDrop.vue'
export default {
    components: {
        BackDrop
    },
    data() {
        return {
            backDropShow: false,
            popupShow: true,
            option: {}
        }
    },
    methods: {
        show(option = {}) {
            this.option = option
            this.popupShow = true
            this.backDropShow = true
        },
        hide() {
            this.popupShow = false
            this.$nextTick(() => {
                this.backDropShow = false
            })

        }
    }
}
</script>
<style lang="stylus">
.popup
    width 350px
    border-radius 4px
    background-color hsla(0,0%,100%,.9)
    .head
        height 50px
        border-bottom: 1px solid #eee
        display flex
        justify-content center
        align-items center
    .body
        padding 15px
        word-wrap break-word
        text-align center
.popup-hidden {
    -webkit-animation-name: f;
    animation-name: f;
    -webkit-animation-duration: .1s;
    animation-duration: .1s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
}

.popup-active  {
    -webkit-animation-name: g;
    animation-name: g;
    -webkit-animation-duration: .2s;
    animation-duration: .2s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
}
@keyframes f
    0%
        transform scale(1)
        opacity 1
    to
        transform scale(.6)
        opacity 0
@keyframes g 
    0% 
        transform scale(1.3)
        opacity 0
     to
        transform scale(1)
        opacity 1
.buttons
    display flex
    justify-content center
.btn {
    border-color: transparent;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    border-radius: 8px;
    vertical-align: top;
    text-align: center;
    text-overflow: ellipsis;
    line-height: 48px;
    cursor: pointer;
    min-width: 52px;
    width: 200px;
    font-size: 20px;
    color: #fff;
}

.blue {
    background-color: #11c1f3;
}
</style>



