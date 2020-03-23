<template>
    <div class="payFail_page page-content">
        <div class="success_title">
            支付失败
        </div>
        <div class="success_img">
            <img src="../../assets/image/ic_60.png" alt="">
            <div class="success_img_text">支付失败</div>
            <div class="look_btn">
                <button class="btn">重新支付</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pay-fail"
    }
</script>

<style lang="scss" scoped>
    .payFail_page{
        padding-bottom: 80px;
        .success_title{
            font-size: 16px;
            font-weight: bold;
        }
        .success_img{
            padding-top: 150px;
            text-align: center;
            .success_img_text{
                margin-top: 20px;
                font-size: 22px;
                font-weight: bold;
                letter-spacing: 0;
            }
            .look_btn{
                margin-top: 100px;
                .btn{
                    padding: 10px 30px;
                    border-radius: 100px;
                    background: #fff;
                    outline: none;
                    border: 1px solid #f44336;
                    font-size: 16px;
                    color: #f44336;
                }
            }
        }
    }
</style>
