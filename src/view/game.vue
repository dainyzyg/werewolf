<template>
    <div class="page flex-column">
        <div class="top">
            <div class="left">
                <div class="player-content" ref="playerContent">
                    <div v-for="player,i in players" :style="{backgroundImage:setBGImage(player)}" :class="{ selected: player.selected }" class="player" @click="selectplayer(player,i)">
                        <div class="number">{{i+1}}</div>
                        <div class="tag-group">
                            <div v-if="player.biaojisiwang" class="tag biaojisiwang">死亡</div>
                            <div v-if="player.biaojijingzhang" class="tag biaojijingzhang">警长</div>
                            <div v-if="player.xuanbusixun" class="tag xuanbusixun">死讯</div>
                        </div>
                    </div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
                <div class="player-option">
                    <div class="circle" @click="addPlayer">
                        <div class="delete"></div>
                        <div class="add"></div>
                    </div>
                    <div class="circle" @click="removePlayer">
                        <div class="delete"></div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="tabs">
                    <div @click="activeTab=1" :class="{active:activeTab==1}" class="tab">角色</div>
                    <div @click="activeTab=2" :class="{active:activeTab==2}" class="tab">状态</div>
                </div>
                <div v-if="activeTab==1" class="list">
                    <!-- <div class="list-item selected">{{selectedPlayer&&selectedPlayer.roleName}}</div> -->
                    <div v-for="role in roles" class="list-item" :class="{selected:isSelectedRole(role)}" @click="setRole(role)">{{role.name}}</div>
                </div>
                <div v-else class="list">
                    <div class="list-item2" @click="setState('biaojisiwang')">
                        <span class="track" :class="{selected:getState('biaojisiwang')}">
                            <div class="handle"></div>
                        </span>
                        <span>标记死亡</span>
                    </div>
                    <div class="list-item2" @click="setState('biaojijingzhang')">
                        <span class="track" :class="{selected:getState('biaojijingzhang')}">
                            <div class="handle"></div>
                        </span>
                        <span>标记警长</span>
                    </div>
                    <div class="list-item2" @click="setState('xuanbusixun')">
                        <span class="track" :class="{selected:getState('xuanbusixun')}">
                            <div class="handle"></div>
                        </span>
                        <span>宣布死讯</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>
<script>
import roles from '../json/role.json'
export default {
    data() {
        return {
            activeTab: 1,
            roles,
            players: [],
            selectedPlayer: null,
            selectedPlayerIndex: null,
            counter: 1
        }
    },
    methods: {
        addPlayer() {
            this.players.push({
                id: this.counter++,
                selected: false,
                roleName: '平民',
                pic: 'pingmin.png',
                biaojisiwang: false,
                biaojijingzhang: false,
                xuanbusixun: false
            })
            this.$nextTick(() => this.$refs.playerContent.scrollTop = 100000)
        },
        selectplayer(player, i) {
            this.selectedPlayerIndex = i;
            this.selectedPlayer = player
        },
        removePlayer() {
            if (this.selectedPlayerIndex != null) {
                this.players.splice(this.selectedPlayerIndex, 1)
                this.selectedPlayerIndex = null
                this.selectedPlayer = null
            }
        },
        setRole(role) {
            if (this.selectedPlayer) {
                this.selectedPlayer.roleName = role.name
                this.selectedPlayer.pic = role.pic
            }
        },
        isSelectedRole(role) {
            if (this.selectedPlayer) {
                return this.selectedPlayer.roleName == role.name
            } else {
                return false
            }
        },
        getState(name) {
            if (this.selectedPlayer) {
                return this.selectedPlayer[name]
            } else {
                return false
            }
        },
        setState(name) {
            if (this.selectedPlayer) {
                this.selectedPlayer[name] = !this.selectedPlayer[name]
            }
        },
        setBGImage(player) {
            if (player.pic) {
                return `url(assets/${player.pic})`
            } else {
                return 'none'
            }
        }
    },
    computed: {

    },
    watch: {
        selectedPlayer(newVal, oldVal) {
            newVal && (newVal.selected = true)
            oldVal && (oldVal.selected = false)
        }
    }
}
</script>

<style scoped>
.page {
    /*background-color: #FFFFFF;*/
}

.top {
    display: flex;
    flex: 1;
}

.bottom {
    /*background-color: #11c1f3;*/
    flex: 0 0 100px;
}

.left {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.right {
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #FFFFFF;
    /*border-left: 2px solid #B5B5B5;*/
    /*opacity: .5;*/
    display: flex;
    flex-direction: column;
    flex: 0 0 200px;
    overflow: hidden;
}

.tabs {
    display: flex;
    flex: 0 0 60px;
}

.tab {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 4px solid transparent;
}

.tab.active {
    color: #11C1F3;
    border-bottom: 4px solid #11C1F3;
}

.list {
    /* border-top: 1px solid #ddd; */
    margin-top: 10px;
    flex: 1;
}

.list-item {
    text-align: center;
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
}

.list-item2 {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
}

.list-item.selected {
    background-color: #11C1F3;
    color: #FFFFFF;
}

.player-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: space-around;
    align-content: flex-start;
    flex: 1;
    flex-wrap: wrap;
}

.player-option {
    flex: 0 0 100px;
    display: flex;
    padding-left: 20px;
    align-items: center;
    /*background-color: saddlebrown;*/
}

.circle {
    position: relative;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    background-color: #11c1f3;
    color: #fff;
}

.add {
    position: absolute;
    top: 15px;
    left: 33px;
    width: 5px;
    background-color: #fff;
    height: 40px;
}

.delete {
    background-color: #fff;
    width: 40px;
    height: 5px;
}

.player {
    /* overflow: hidden; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    height: 120px;
    width: 120px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    border-radius: 20px;
    border: 4px solid transparent;
    background-size: contain;
    /*background-color: #9f5050;
        background-color: #484746;*/
    /*border: 2px solid #B5B5B5;*/
}

.number {
    position: absolute;
    bottom: 0px;
    right: 0px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    color: white;
    background-color: #4A90E2;
    text-align: center;
    line-height: 30px;
}

.player.selected {
    border: 4px solid #11C1F3;
}

.placeholder {
    margin: 20px;
    width: 120px;
    border: 4px solid transparent;
}

.track {
    position: relative;
    margin: 0 10px;
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-transition-property: background-color, border;
    transition-property: background-color, border;
    display: inline-block;
    box-sizing: border-box;
    width: 51px;
    height: 31px;
    border: 2px solid #e6e6e6;
    border-radius: 20px;
    background-color: #fff;
    content: " ";
}

.handle {
    -webkit-transition: .3s cubic-bezier(0, 1.1, 1, 1.1);
    transition: .3s cubic-bezier(0, 1.1, 1, 1.1);
    -webkit-transition-property: background-color, transform;
    transition-property: background-color, transform;
    position: absolute;
    display: block;
    width: 27px;
    height: 27px;
    border-radius: 27px;
    background-color: #fff;
    top: 0px;
    left: 0px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, .35), 0 1px 1px rgba(0, 0, 0, .15);
}

.track.selected {
    border-color: #11c1f3;
    background-color: #11c1f3;
}

.track.selected .handle {
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
    background-color: #fff;
}

.tag-group {
    position: absolute;
    top: -5px;
    left: -4px;
    height: 63px;
    width: 128px;
    display: flex;
}

.tag {
    padding-left: 6px;
    padding-top: 5px;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    font-size: 14px;
    width: 25px;
    height: 63px;
    margin-right: 10px;
    color: #fff;
    background-size: 100% 100%;
    z-index: 10;
}

.tag.biaojisiwang {
    background-image: url(../../assets/tag-red.png);
}

.tag.biaojijingzhang {
    background-image: url(../../assets/tag-green.png);
}

.tag.xuanbusixun {
    background-image: url(../../assets/tag-yellow.png);
}
</style>