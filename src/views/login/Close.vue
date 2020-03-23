<template>
</template>

<script>
    export default {
        name: "Close",
        mounted(){
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
                window.location.href="about:blank";
                window.close();
            } else {
                window.opener = null;
                window.open("", "_self");
                window.close();
            }
        },
    }
</script>

<style scoped>

</style>
