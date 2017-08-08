<template>
    <div class="page flex-column">
        <div class="top">
            <div class="left">
                <div class="player-content" ref="playerContent">
                    <div v-for="player,i in players" :style="{backgroundImage:setBGImage(player)}" :class="{ selected: player.selected,dead:player.biaojisiwang }" class="player" @click="selectplayer(player,i)">
                        <div class="number">{{i+1}}</div>
                        <div class="tag-group">
                            <div v-if="player.biaojisiwang" class="biaojisiwang"></div>
                            <div v-if="player.biaojijingzhang" class="tag biaojijingzhang">警长</div>
                            <div v-if="player.xuanbusixun" class="tag xuanbusixun">死讯</div>
                        </div>
                        <div class="roleName">{{player.roleName}}</div>
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
                    <div class="btn blue" @click="declareDead">宣布死讯</div>
                    <div class="btn blue" @click="$router.push('/')">返回菜单</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="musicName">{{musicName}}</div>
            <div class="buttons">
                <div class="circle-btn prev" :class="{active:activePrev}" @click="prev">
    
                </div>
                <div class="circle-btn play" :class="{active:activePlay,play:!isPlay,pause:isPlay}" @click="togglePlay">
    
                </div>
                <div class="circle-btn next" :class="{active:activeNext}" @click="next">
    
                </div>
                <div class="circle-btn playlist" @click="playListShow=true">
    
                </div>
            </div>
            <audio @error="playError" @ended="playEnded" ref="audioplay">
            </audio>
        </div>
        <CplayList @deleteSong='deleteSong' @playListClick='playListClick' :isPlay="isPlay" :show.sync="playListShow" :playIndex.sync="currentPlayIndex" :newPlayList='newPlayList' :totalPlayList="totalPlayList"></CplayList>
    </div>
</template>
<script>
import roles from '../json/role.json'
import playList from '../json/playList.json'
import CplayList from '../compoments/playList.vue'

let newPlayList = []
if (localStorage.newPlayList) {
    newPlayList = JSON.parse(localStorage.newPlayList)
}
export default {
    components: {
        CplayList
    },
    data() {
        return {
            activeTab: 1,
            roles,
            playList,
            players: [],
            selectedPlayer: null,
            selectedPlayerIndex: null,
            counter: 1,
            activePrev: false,
            activeNext: false,
            isPlay: false,
            activePlay: false,
            currentPlayIndex: 0,
            playListShow: false,
            newPlayList
        }
    },
    created() {
        if (localStorage.roleList && plus) {
            this.roles = JSON.parse(localStorage.roleList)
        }
    },
    methods: {
        playError(e) {
            // console.log(e)
            this.changePlayIndex('next')
        },
        deleteSong(i) {
            let index = i - this.playList.length
            this.newPlayList.splice(index, 1)
        },
        playListClick(i) {
            if (this.currentPlayIndex == i) {
                this.togglePlay()
            } else {
                this.currentPlayIndex = i
            }
        },
        durationchange(e) {
            // console.log(e.target.duration)
            e.target.currentTime = e.target.duration - 5
        },
        playEnded() {
            // console.log('playEnded')
            this.next()
        },
        changePlayIndex(tag) {
            switch (tag) {
                case 'next':
                    this.currentPlayIndex += 1
                    if (this.currentPlayIndex >= this.totalPlayList.length) {
                        this.currentPlayIndex = 0
                    }
                    break
                case 'prev':
                    this.currentPlayIndex -= 1
                    if (this.currentPlayIndex < 0) {
                        this.currentPlayIndex = this.totalPlayList.length - 1
                    }
                    break
            }
        },
        togglePlay() {
            if (!this.$refs.audioplay.src) {
                let currentPlay = this.totalPlayList[this.currentPlayIndex]
                this.$refs.audioplay.src = currentPlay.src
            }
            if (this.isPlay) {
                this.$refs.audioplay.pause()
            } else {
                this.$refs.audioplay.play()
            }
            this.isPlay = !this.isPlay
            this.activePlay = true
            setTimeout(() => {
                this.activePlay = false
            }, 200)
        },
        play() {
            this.isPlay = true
            let currentPlay = this.totalPlayList[this.currentPlayIndex]
            this.$refs.audioplay.src = currentPlay.src
            let playPromise = this.$refs.audioplay.play()
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    // Automatic playback started!
                }).catch(function (error) {
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                })
            }

        },
        prev() {
            this.activePrev = true
            setTimeout(() => {
                this.activePrev = false
            }, 200)
            this.changePlayIndex('prev')
            // this.play()
        },
        next() {
            this.activeNext = true
            setTimeout(() => {
                this.activeNext = false
            }, 200)
            this.changePlayIndex('next')
            // this.play()
        },
        addPlayer() {
            this.players.push({
                id: this.counter++,
                selected: false,
                roleName: '',
                pic: '',
                biaojisiwang: false,
                biaojijingzhang: false
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
                // console.log(player.pic)
                return `url(${player.pic})`
            } else {
                return 'none'
            }
        },
        declareDead() {
            let deadNumbers = []
            this.players.forEach((player, index) => {
                if (player.biaojisiwang) {
                    deadNumbers.push(index + 1)
                }
            })
            let content = deadNumbers.length ? `${deadNumbers.join(',')}号死亡` : '无人死亡'
            this.$alert.show({
                title: '死亡结果',
                content
            })
        }
    },
    computed: {
        totalPlayList() {
            return this.newPlayList.concat(this.playList)
            // return this.playList.concat(this.newPlayList)
        },
        musicName() {
            let currentPlay = this.totalPlayList[this.currentPlayIndex]
            return currentPlay.name
        }
    },
    watch: {
        selectedPlayer(newVal, oldVal) {
            newVal && (newVal.selected = true)
            oldVal && (oldVal.selected = false)
        },
        currentPlayIndex(i) {
            this.play()
        },
        newPlayList(val) {
            // console.log('newPlayList')
            localStorage.newPlayList = JSON.stringify(val)
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
    flex: 0 0 120px;
    display: flex;
    flex-direction: column;
}

.musicName {
    flex: 1;
    color: #11c1f3;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.buttons {
    flex: 0 0 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.left {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: 1px solid #ddd;
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

.circle-btn {
    position: relative;
    margin: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);
    /* background-color: #11c1f3; */
    color: #fff;
    background-size: cover;
    transition: all .2s ease-in-out;
}

.circle-btn.active {
    transform: scale(1.2);
}


.circle-btn.prev {
    background-image: url(../../assets/prev.png);
}

.circle-btn.play {
    background-image: url(../../assets/play.png);
}

.circle-btn.pause {
    background-image: url(../../assets/pause.png);
}

.circle-btn.next {
    background-image: url(../../assets/next.png);
}

.circle-btn.playlist {
    background-image: url(../../assets/playlist.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
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

.player.dead {
    filter: grayscale(100%);
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

.roleName {
    position: absolute;
    top: 125px;
    left: 0;
    right: 0;
    text-align: center;
    color: #4A90E2;
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
    padding-top: 5px;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    font-size: 16px;
    line-height: 35px;
    text-indent: 10px;
    letter-spacing: 10px;
    width: 35px;
    height: 90px;
    margin-right: 10px;
    color: #fff;
    background-size: 100% 100%;
    z-index: 10;
}

.biaojisiwang {
    position: absolute;
    top: -11px;
    transform: rotate(45deg);
    border-left: 5px solid cadetblue;
    border-right: 5px solid cadetblue;
    left: 52px;
    width: 15px;
    height: 150px;
    z-index: 11;
}

.tag.biaojijingzhang {
    background-image: url(../../assets/tag-green.png);
}

.tag.xuanbusixun {
    background-image: url(../../assets/tag-yellow.png);
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
    line-height: 48px;
    cursor: pointer;
    min-width: 52px;
    width: 180px;
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
}

.blue {
    background-color: #11c1f3;
}
</style>