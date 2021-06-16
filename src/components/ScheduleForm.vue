<template>
    <div>
        <p>{{year}}年{{month}}月{{day}}日</p>
        <div>
            <label>何時から：<input type="time" v-model="from"></label>
        </div>
        <div>
            <label>何時まで：<input type="time" v-model="toTime"></label>
        </div>
        <div>
            <input type="text" v-model="title">
        </div>
        <div>
            <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
        </div>
        <div>
            <button @click="postData">送信する</button>
        </div>
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
            
            // Access to XMLHttpRequest at 'https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
            
            this.axios.get("https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev?month=2021-06").then((response) => {
                console.table(response.data)
            })
            
        }
    }
}
</script>
