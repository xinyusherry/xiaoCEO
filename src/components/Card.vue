<template>
    <div :class="'card '+ (classname||'')" :style="{ width:cardset.width }">
        <div class='border' :style="{ background: background}"></div>
        <div v-if='!classname' class='titleDiv'> <span class='title'>{{cardset.title}}</span><span class="time">{{propsTime||time}}</span></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: ['cardset', 'timetype', 'classname','propsTime'],
        data() {
            return {
                background: 'linear-gradient(to right, ' + this.cardset.leftcolor + ' , ' + this.cardset.rightcolor + ')',
                time: ''
            }
        },
        mounted() {
            this.nowTime();
            if (this.timer) {
            clearInterval(this.timer)
            } else {
            this.timer1 = setInterval(() => {
                this.nowTime()
            }, 1000)
            }
        },
        methods: {
            showTime: function (type, date) {
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            var day = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours().toString().length === 1 ? "0" + date.getHours() : date.getHours();
            var minute = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes();
            var second = date.getSeconds().toString().length === 1 ? "0" + date.getSeconds() : date.getSeconds();
            switch (type) {
                case 'time':
                this.time = [year, month, day].join('-') + "  " + [hour, minute, second].join(":")
                break
                case 'month':
                this.time = [year, month].join('-')
                break
                case 'day':
                this.time = [year, month, day].join('-')
                break
                default:
                this.time = ''
                break
            }
            },
            nowTime: function () {
            var date = new Date()

            this.showTime(this.timetype, date)
            date = null
            },
        }
    }
</script>

<style scoped>

</style>