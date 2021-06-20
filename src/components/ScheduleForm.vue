<template>
    <div>
        <div class="close-modal-but">
            <button v-on:click="close">✖</button>
        </div>
        <button @click="onForm">予定を追加する</button>
        <div v-show="showForm" class="todo-form">
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
            <button @click="offForm">閉じる</button>
        </div>
        <div class="time-table">
            <div v-for="schedule, index in schedules" :key="index">
                <div>
                    <span>{{schedule.daytime}}</span>
                    <span>~</span>
                    <span>{{schedule.untilTime}}</span>
                    <span>{{schedule.title}}</span>
                    <button @click="deleteData(schedule.daytime)" class="delete-button">削除する</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// detail: (...)
// title: (...)
// untilTime: (...)
// yearmonth: (...)
export default {
    props : {year : String, month : String, day : Number, schedules: Array, close : Function},
    data() {
        return {
            from : "",
            toTime : "",
            title : "",
            text : "",
            showForm : false
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
            
        },
        deleteData(daytime) {
            //daytimeはschedule.daytimeを引数で受け取る
            //yearmonthは桁数に注意して
            const yearmonth = this.year + "-" + this.month
            const deleteDate = "?yearmonth=" + yearmonth + "&" + "daytime=" + daytime
            // console.log("?yearmonth=" + yearmonth + "+" + "daytime=" + daytime)
            this.axios.delete("https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev" + deleteDate).then((response) => {
                console.table(response.data)
            })
        },
        onForm() {
            this.showForm = true
        },
        offForm() {
            this.showForm = false
        },
    }
}
</script>
<style>
.close-modal-but {
    text-align: right;
}
.todo-form{
    border: 1px solid;
}
.time-table {
    margin: 20px 0;
    overflow: scroll;
    max-height: 300px;
}
.time-box {
    border: 1px solid;
    
}
.n-time {
    text-align: left;
}
.v-minits {
    visibility:hidden;
}
</style>
