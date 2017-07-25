<template>
    <transition :name="transitionName">
        <router-view>
        </router-view>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            transitionName: 'page'
        }
    },
    watch: {
        '$route'(to, from) {
            this.transitionName = to.path == '/' ? 'pageback' : 'page'
        }
    }
}
</script>
