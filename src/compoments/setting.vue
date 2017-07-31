<template lang="pug">
BackDrop(:show='show')
    transition(name='slideup')
        .modal(v-if='modalShow')
            .header
                .close1
                .close(@click='hide')
            .content
                .textarea
                    .label 服务器地址
                    textarea(v-model='serverURL' type="text" placeholder="服务器地址")
                //- input(type="text" placeholder="asdasdasd" style='width:300px;height:50px;')
                .buttons
                    .btn.royal(@click='hide') 取消
                    .btn.blue(@click='save') 保存
</template>
<script>
import BackDrop from '../compoments/backDrop.vue'

export default {
    components: {
        BackDrop
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            modalShow: false,
            serverURL: localStorage.serverURL,
        }
    },
    computed: {

    },
    watch: {
        show(val) {
            if (val) {
                this.$nextTick(() => {
                    this.modalShow = true
                })
            }
        }
    },
    methods: {
        save() {
            if (!this.serverURL) {
                this.$alert.show({
                    title: '提示',
                    content: '服务器地址不能为空！'
                })
                return
            }
            localStorage.serverURL = this.serverURL
            this.modalShow = false
            this.$nextTick(() => {
                this.$emit('update:show', false)
            })
        },
        hide() {
            this.serverURL = localStorage.serverURL
            this.modalShow = false
            this.$nextTick(() => {
                this.$emit('update:show', false)
            })
        },

    }
}
</script>
<style lang="stylus" scoped>
.modal
    width 500px
    height 600px
    background-color #fff
    position relative
    flex-direction column
    display flex
    overflow hidden
    z-index 100
    .header
        position absolute
        top 0
        border-top-width 0
        border-bottom-width 1px
        height 50px
        width 100%
        background-color #fff
        box-shadow 0 0 10px rgba(0,0,0,.15)
        z-index 110
        display flex
        justify-content space-between
        align-items stretch
        color #11c1f3
        .add
            width 50px
            background-image url(../../assets/add.png)
            background-size 30px 30px
            background-repeat no-repeat
            background-position center
        .close
            width 50px
            background-image url(../../assets/close.png)
            background-size 30px 30px
            background-repeat no-repeat
            background-position center
    .content
        flex 1
        background-color #f5f5f5
        padding-top 60px
        overflow-y auto
        -webkit-overflow-scrolling touch
        z-index 101
        .textarea
            background-color #fff
            height 100px
            border-bottom: 1px solid #ddd
            display flex
            align-items flex-start
            font-size 17px
            .label
                flex 0 0 100px
                text-align right
                padding-right 10px
                padding-top 10px
            textarea
                resize none
                border 0
                padding 10px 0
                margin 0
                font-size 17px
                height 80px
                outline:none
                flex 1
                -webkit-appearance none
.slideup-enter-active
.slideup-leave-active
.slidedown-enter-active
.slidedown-leave-active
    transition: all .4s cubic-bezier(.1,.7,.1,1)
.slideup-enter
.slideup-leave-to 
    transform translate3d(0,100%,0)
.slidedown-enter
.slidedown-leave-to 
    transform translate3d(0,-100%,0)
.list-item
    font-size 17px
    height 40px
    border-bottom: 1px solid #ddd
    line-height: 40px
    display flex
    .icon
        flex 0 0 30px
    .name
        flex 1
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
    .options
        flex 0 0 140px
        display flex
        align-items center
        justify-content flex-end
        .delete
            width 40px
            height 35px
            background-image url(../../assets/delete.png)
            background-size 22px 22px
            background-repeat no-repeat
            background-position center
.list-item.selected
    .icon
        background-image url(../../assets/music.png)
        background-size 22px 22px
        background-repeat no-repeat
        background-position center
        animation circle 2s infinite linear
    .name
        color #11c1f3

@keyframes circle
    0%
        transform rotate(0deg)
    100%
        transform:rotate(-360deg)
.buttons
    display flex
    justify-content space-around
.btn
    border-color transparent
    margin-top 20px
    margin-bottom 20px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, .26)
    border-radius 8px
    vertical-align top
    text-align center
    text-overflow: ellipsis
    line-height 48px
    cursor pointer
    min-width 50px
    width 150px
    font-size 20px
    color #fff
.blue
    background-color #11c1f3
.royal
    background-color #B5B5B5
</style>
