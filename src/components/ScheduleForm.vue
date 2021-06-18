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
        <button v-on:click="close">閉じる</button>
        <!-- <button >閉じる</button> -->
    </div>
</template>

<script>
export default {
    // props: ["year", "month", "day", close],
    props : {year : String, month : String, day : Number, close : Function},
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
            const yearmonth = this.year + "-" + this.month
            const daytime = ("0" + this.day).slice(-2) + "-" + this.from
            const untiltime = ("0" + this.day).slice(-2) + "-" + this.toTime
            
            const postData = {
                yearmonth: yearmonth,
                daytime: daytime,
                untilTime : untiltime,
                title : this.title,
                detail : this.text
            }
            
            // console.log(postData)
            
            // this.axios.post("https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev", postData).then((response) => {
            //     console.table(response.data)
            // })
            
        }
    }
}
</script>
