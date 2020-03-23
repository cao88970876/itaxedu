<template>
    <div class="file-group clear">
        <template v-for="(item, index) in images">
            <div :key="index" class="file-wrapper left" @click="changeImage(index)">
                <div class="file">
                    <img :src="$helper.utils.api + item">
                </div>
                <i class="close" @click.stop="removeImage(index)"><img src="../../assets/image/img/remove.png"></i>
            </div>
        </template>
        <div class="file-wrapper" v-if="show">
            <div class="file add-file" @click="addImage"></div>
        </div>
        <input type="file" v-if="clear" :accept="accept" @change="fileChange" ref="fileInput" style="display: none;"
               area-hidden="true">
    </div>
</template>
<script>
    import Api from '../../api/upload';

    export default {
        data() {
            return {
                clear: true,
                accept: "image/*",
                images: [],
                show: true
            };
        },
        methods: {
            addImage() {
                if (this.images.length >= 3) {
                    this.show = false
                    // this.$message.error("最多只能上传9张图片！");
                    return;
                }
                this.isChange = false;
                this.clear = true;

                this.$refs.fileInput.click();
            },
            changeImage(index) {
                this.isChange = true;
                this.changeIndex = index;

                this.$refs.fileInput.click();
            },
            removeImage(index) {
                if (this.images.length <= 9) {
                    this.show = true
                }
                this.images.splice(index, 1);
            },
            fileChange() {
                const fileData = this.$refs.fileInput.files[0];

                // if (this.accept.indexOf(fileData.type) === -1) {
                //     this.$message.error("上传的文件格式不正确！请重新上传！");
                //   return;
                // }

                this.clear = false;

                let formData = new FormData();
                formData.append("file", fileData, fileData.name);

                Api.uploadImage(formData)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1) {
                            if (this.isChange) {
                                this.images.splice(this.changeIndex, 1, res.data.data.path);
                                this.isChange = false;
                            } else {
                                this.images.push(res.data.data.path);
                                if (this.images.length >= 9) {
                                    this.show = false
                                }
                            }
                        } else {
                            this.$message.error(res.data.msg);
                        }
                        this.clear = true;
                    })
                    .catch(err => {
                        this.clear = true;
                        this.$message.error(err);
                    });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .file-group {

        align-items: center;
        align-content: flex-start;
        flex-flow: row wrap;
        .file-wrapper {
            flex: 1;
            box-sizing: border-box;
            position: relative;
            margin-right: 30px;
            .file {
                width: 140px;
                height: 140px;
                float: left;
                margin-bottom: 15px;
                &.add-file {
                    background: url("../../assets/image/img/add_file.png");
                    background-size: 100% 100%;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .close {
                display: block;
                position: absolute;
                left: 150px;
                top: -15px;
                width: 20px;
                height: 20px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

