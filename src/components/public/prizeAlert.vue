<template>
  <section class="alert-wrapper" @touchmove.stop v-show="show">
    <div class="alert-content">
      <div v-if="title" class="title">{{title}}</div>
      <img :src="$helper.utils.api+img" class="img_box"/>
      <div class="content">{{ message }}<slot></slot></div>
      <div class="button-group">
        <div class="confirm pointer" @click="confirmClick">{{ confirmText }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
     title: {
      type: String,
      default: ''
    },
    message: {
      default: ''
    },
    img: {
      default: ''
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  model: {
    prop: 'show',
    event: 'handleShow'
  },
  methods: {
    cancelClick() {
      this.$emit('handleShow', false)
      this.$emit('cancel')
    },
    confirmClick() {
      this.$emit('handleShow', false)
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
  .alert-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,0.50);
    z-index: 99;
    .alert-content {
      width: 500px;
      background: #fff;
      border-radius:6px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 28px 0;
      text-align: center;
      .img_box{
        width:200px;
      }
      .title{
        font-size:16px;
        font-weight: 600;
        color:#333;
        border-bottom:1px solid rgba(0,0,0,0.06);
        text-align: center;
        margin-bottom: 15px;

      }
      .content {
        padding: .1rem;
        font-size: 17px;
        line-height:34px;
        text-align: center;
      }
      .button-group {
        border-top: 1px solid rgba(#000, .06);
        display: flex;
        align-items: center;
        font-size: 17px;
        height: 54px;
        line-height: 54px;
        .cancel {
          flex: 1;
          text-align: center;
          border-right: 2px solid #fdfdfd;
          color: #999;
        }
        .confirm {
          text-align: center;
          color: white;
          background: #F54538;
          border-radius: 100px;
          width: 60%;
          margin: 0 auto;
          height: 40px;
          line-height:40px;
        }
      }
    }
  }
</style>
