<template>
    <div class="page flex-column">
        <div class="btn red" @click="$router.push('game')">开始对局</div>
        <div class="btn blue" @click="$router.push('intro')">身份介绍</div>
        <div class="btn yellow" @click="$router.push('role')">常见规则</div>
        <div class="btn green" @click="$router.push('about')">关于我们</div>
    </div>
</template>
<style scoped>
.page {
    justify-content: center;
    align-items: center;
}

.btn {
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

