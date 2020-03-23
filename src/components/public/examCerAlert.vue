<template>
    <section class="examCerAlert-wrapper">
        <div class="examCerAlert-content">
            <div class="content" ref="print"><img :src="pic"></div>
            <div class="button-group">
                <a :href="pic" target="_blank" download="" class="download pointer">下载</a>
                <!-- <div class="download pointer" @click="downloadClick">下载</div> -->
                <div class="printing  pointer" @click="printingClick">打印</div>
            </div>
            <div class="examAlertClose" @click="examCloseClick"></div>
        </div>
    </section>
</template>

<script>
    export default {
        name:"examCerAlert",
        props: {
            pic: {
                type: String,
                default: ''
            }
        },
        methods: {
            printingClick() {
                this.$print(this.$refs.print);
            },
            downloadClick() {
                this.downloadIamge(this.pic,'图片');
            },
            examCloseClick(){
                this.$emit('examCloseClick')
            },
            downloadIamge(imgsrc, name) {//下载图片地址和图片名
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .examCerAlert-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0,0,0,0.50);
        z-index: 99;
        .examCerAlert-content {
            background: #fff;
            border-radius: .16rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            min-width: 800px;
            max-height: 90%;
            .content {
                padding:43px;
                font-size: 14px;
                line-height:24px;
                text-align: center;
                img{
                    height: 55vh;
                }
            }
            .button-group {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size:16px;
                height: 40px;
                line-height: 40px;
                padding-bottom:90px; 
                .printing {
                    flex: 0 0 219px;
                    height: 39px;
                    line-height: 39px;
                    text-align: center;
                    background: #303F9F;
                    color: #fff;
                    margin: 0 30px;
                }
                .download {
                    display: block;
                    flex: 0 0 219px;
                    height: 39px;
                    line-height: 39px;
                    text-align: center;
                    background: #303F9F;
                    color: #fff;
                    margin: 0 30px;
                }
            }
            .examAlertClose{
                position: absolute;
                right: 10px;
                top: 10px;
                width: 33px;
                height: 33px;
                background: url('../../assets/image/examAlertClose.png') no-repeat center;
                background-size: contain;
                cursor: pointer;
            }
        }
    }
</style>
