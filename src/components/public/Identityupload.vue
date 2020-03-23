<template>
  <div class="file-group">
    <template v-for="(item, index) in images">
      <div :key="index" class="file-wrapper" @click="changeImage(index)">
        <div class="file">
          <img :src="$helper.utils.api + item">
        </div>
      </div>
    </template>
    <!--<div class="file-wrapper" v-if="closeclear">-->
      <!--<div class="file add-file" @click="addImage"></div>-->
    <!--</div>-->
    <input type="file" v-if="clear" :accept="accept" @change="fileChange" ref="fileInput" style="display: none;" area-hidden="true">
  </div>
</template>
<script>
  // import Api from "@/api";
  import Api from '../../api/upload';
  export default {
    data() {
      return {
        clear: true,
        accept: "image/",
        images: [],
        closeclear:true,

      };
    },
      props: {
          src:""
      },
      created(){
        this.images.push(this.src)
      },
    methods: {
      addImage() {
        if (this.images.length >= 1) {
          this.$message.error("最多只能上传8张图片！");
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
      // removeImage(index) {
      //   this.images.splice(index, 1);
      //   this.closeclear=true
      // },
      fileChange() {
        const fileData = this.$refs.fileInput.files[0];
        debugger
          console.log(fileData)
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
            if (res.data.status == 1) {
                debugger
              if (this.isChange) {
                this.images.splice(this.changeIndex, 1, res.data.data.path);
                this.isChange = false;
              } else {
                this.images.push(res.data.data.path);
              }
              this.closeclear=false
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
    padding: 0.06rem;
    display: flex;
    align-items: center;
    align-content: flex-start;
    flex-flow: row wrap;
    .file-wrapper {
      /*height: 1.2rem;*/
      box-sizing: border-box;
      /*padding: 0.06rem;*/
      position: relative;
      /*width: 100%;*/
      .file {
        width:70px;
        height: 70px;
        &.add-file {
          /*background: url("../../assets/image/img/add_file.png");*/
          /*background-size: 100% 100%;*/
        }
        img {
          width: 70px;
          height:70px;
          border-radius:50%;
            object-fit: cover;
        }
      }
      /*<!--.close {-->*/
        /*<!--display: block;-->*/
        /*<!--position: absolute;-->*/
        /*<!--right: -0.03rem;-->*/
        /*<!--top: -0.03rem;-->*/
        /*<!--width: 0.24rem;-->*/
        /*<!--height: 0.24rem;-->*/
        /*<!--img {-->*/
          /*<!--width: 20px;-->*/
          /*<!--height: 20px;-->*/
        /*<!--}-->*/
      /*<!--}-->*/
    }
  }
</style>


