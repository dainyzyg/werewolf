<template lang="pug">
.page
    .bg(@click.self='showBackDrop')
</template>
<script>
import BackDrop from '../compoments/backDrop.vue'
export default {
    components: {
        BackDrop
    },
    data() {
        return {
            i: 0
        }
    },
    methods: {
        showBackDrop() {
            this.$alert.show({
                title: this.i++,
                content: this.i++
            })
        },
        hide() {

        }
    }
}
</script>
<style lang="stylus">
.bg
    display flex
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    justify-content center
    align-items center
</style>



