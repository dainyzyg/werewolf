<template lang="pug">
.page.flex-column
    pre.console {{text}}
    .btn.blue(@click="$router.push('/')") 返回
</template>
<script>
export default {
    data() {
        return {
            text: ''
        }
    },
    created() {
        if (localStorage.role) {
            this.text = localStorage.role
        }
    }
}
</script>

<style lang="stylus" scoped>
.console
    flex 1
    background #FFFFFF
    align-self stretch
    padding 40px
    margin 0
    overflow-x hidden
    overflow-y auto
    word-wrap break-word
    white-space pre-wrap
.page {
    justify-content: flex-start;
    align-items: center;
}

.btn {
    flex: 0 0 60px
    border-color: transparent;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    border-radius: 8px;
    vertical-align: top;
    text-align: center;
    text-overflow: ellipsis;
    line-height: 60px;
    cursor: pointer;
    padding: 0 12px;
    min-width: 52px;
    width: 350px;
    font-size: 20px;
    color: #fff;
}

.blue {
    background-color: #4a90e2;
}

.blue2 {
    background-color: #11c1f3;
}

.red {
    background-color: #ea5a49;
}

.green {
    background-color: #4c0;
}

.yellow {
    background-color: #ffbd17;
}
</style>
