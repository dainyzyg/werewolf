<template lang="pug">
.page.flex-column
    pre.console {{text}}
    .btn.green(@click='getRoleList') 开始更新
    .btn.red(@click='showSetting=true') 设置
    .btn.blue(@click="$router.push('/')") 返回
    Csetting(:show.sync='showSetting')
</template>
<script>
import Csetting from '../compoments/setting.vue'
import axios from 'axios'
let serverURL = ''
export default {
    components: {
        Csetting
    },
    data() {
        return {
            showSetting: false,
            text: '',
            // url: '',
            downloadCount: 0,
            data: []
            // url: `url(${plus.io.convertLocalFileSystemURL('_downloads/狼人.png')})`
        }
    },
    methods: {
        getRoleList() {
            if (!localStorage.serverURL) {
                this.$alert.show({
                    title: '提示',
                    content: '请配置服务器地址！'
                })
                return
            }
            serverURL = localStorage.serverURL + '/'
            this.text = ''
            this.getTxt('关于我们.txt', 'about')
            this.getTxt('身份介绍.txt', 'intro')
            this.getTxt('常见规则.txt', 'role')
            axios({
                method: 'get',
                url: `${serverURL}getRoleList`,
                // data: {
                //     firstName: 'Fred',
                //     lastName: 'Flintstone'
                // },
                timeout: 5000
            }).then(response => {
                this.data = response.data
                this.deleteFile()
            }).catch(error => {
                this.text += error.stack + '\n'
            })
        },
        getTxt(txtName, name) {
            axios({
                method: 'get',
                url: `${serverURL}${txtName}`,
                // data: {
                //     firstName: 'Fred',
                //     lastName: 'Flintstone'
                // },
                timeout: 5000
            }).then(response => {
                this.text += '下载成功：' + txtName + '\n'
                localStorage[name] = response.data
            }).catch(error => {
                this.text += error.stack + '\n'
            })
        },
        deleteFile() {
            plus.io.resolveLocalFileSystemURL("_downloads/werewolf/", entry => {
                entry.removeRecursively(entry => {
                    this.download()
                }, e => {
                    this.text += e.message + '\n'
                })
            }, e => {
                this.download()
            })
        },
        download() {
            this.downloadCount = 0
            for (let file of this.data) {
                // console.log(`${serverURL}${file.fileName}`)
                this.downloadCount++
                var dtask = plus.downloader.createDownload(`${serverURL}角色/${file.fileName}`,
                    {
                        filename: '_downloads/werewolf/'
                    },
                    (d, status) => {
                        // 下载完成
                        if (status == 200) {
                            this.text += '下载成功：' + file.fileName + '\n'
                            // console.log(d.filename)
                            file.pic = plus.io.convertLocalFileSystemURL(d.filename)
                        } else {
                            this.text += '下载失败：' + file.fileName + '\n'
                        }
                        this.submitDownload()
                    })
                //dtask.addEventListener( "statechanged", onStateChanged, false );
                dtask.start()
            }
        },
        submitDownload() {
            this.downloadCount--
            if (this.downloadCount == 0) {
                localStorage.roleList = JSON.stringify(this.data)
                this.text += '更新完成！' + '\n'
            }
        },
        test() {
            // plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function (fs) {
            //     // fs.root是根目录操作对象DirectoryEntry
            //     // 创建读取目录信息对象 
            //     var directoryReader = fs.root.createReader();
            //     directoryReader.readEntries(function (entries) {
            //         var i;
            //         for (i = 0; i < entries.length; i++) {
            //             console.log(entries[i].name);
            //         }
            //     }, function (e) {
            //         console.log("Read entries failed: " + e.message);
            //     });
            // });
            plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function (fs) {
                // fs.root是根目录操作对象DirectoryEntry
                fs.root.getFile('config.xml', { create: true }, function (fileEntry) {
                    // fileEntry.createWriter(function (writer) {
                    //     // Write data to file.
                    //     console.log('writer')
                    //     writer.write("Data ");
                    // }, function (e) {
                    //     alert(e.message);
                    // });
                    fileEntry.file(function (file) {
                        var fileReader = new plus.io.FileReader();
                        alert("getFile:" + JSON.stringify(file));
                        fileReader.readAsText(file, 'utf-8');
                        fileReader.onloadend = function (evt) {
                            alert("11" + evt);
                            alert("evt.target" + evt.target);
                            alert(evt.target.result);
                        }
                        alert(file.size + '--' + file.name);
                    });
                });
            });
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
.page 
    justify-content flex-start
    align-items center
    padding-bottom 10px
    padding 20px
    box-sizing border-box


.btn {
    flex: 0 0 60px
    border-color: transparent;
    margin-top: 10px;
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
