<template>
    <div>
        <div class="close-modal-but">
            <div>
                <button @click="offForm" v-show="showForm">戻る</button>
                <button @click="onForm" v-show="showSchedule">予定を追加する</button>
            </div>
            <div>
                <button v-on:click="close">✖</button>
            </div>
        </div>
        <div v-show="showForm" class="todo-form">
            <p>{{year}}年{{month}}月{{day}}日</p>
            <div>
                <label>何時から<input type="time" v-model="from"></label>
                <label>何時まで<input type="time" v-model="toTime"></label>
            </div>
            <div class="form-title">
                <label for="">タイトル</label>
                <input type="text" v-model="title">
            </div>
            <div>
                <p style="margin:0">内容</p>
                <textarea cols="40" rows="10" v-model="text"></textarea>
            </div>
            <div class="form-button">
                <button @click="postData">送信する</button>
            </div>
        </div>
        <div class="time-table" v-show="showSchedule">
            <p style="margin-top:0">予定</p>
            <div class="time-schedule">
                <div v-for="schedule, index in schedules" :key="index">
                    <div>
                        <span>{{schedule.daytime}}</span>
                        <span>~</span>
                        <span>{{schedule.untilTime}}</span>
                        <span>{{schedule.title}}</span>
                        <span @click="deleteData(schedule.daytime)" class="delete-button">削除する</span>
                    </div>
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
            showForm : false,
            showSchedule : true
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
            this.showSchedule = false
        },
        offForm() {
            this.showForm = false
            this.showSchedule = true
        },
    }
}
</script>
<style>
.close-modal-but {
    display: flex;
    justify-content: space-between;
}
/* .todo-form{
    border: 1px solid;
} */
.form-title{
    margin-top: 10px;
}
.form-button {
    margin-top: 10px;
}
.time-table {
    margin: 10px 0;
}
.time-schedule {
    overflow-y: scroll;
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
.delete-button {
    cursor: pointer;
}
.delete-button:hover {
    font-weight: 500;
    text-decoration: underline;
}
</style>
