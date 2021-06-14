<template>
    <div>
        <p>{{year}}年{{month}}月{{day}}日</p>
        <label>何時から：<input type="time" v-model="from"></label>
        <label>何時まで：<input type="time" v-model="toTime"></label>
        <input type="text" v-model="title">
        <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
        <button @click="postData">送信する</button>
    </div>
</template>

<script>
export default {
    props: ["year", "month", "day"],
    data() {
        return {
            from : "",
            toTime : "",
            title : "",
            text : ""
        }
    },
    methods: {
        postData() {
            const schedule = this.year + "-" + this.month + "-" + ("0" + this.day).slice(-2) + "&" + this.from
            const untiltime = this.year + "-" + this.month + "-" + ("0" + this.day).slice(-2) + "&" + this.toTime
            
            const postData = {
                schedule : schedule,
                untiltime : untiltime,
                title : this.title,
                text : this.text
            }
            
            console.table(postData)
            
        }
    }
}
</script>
