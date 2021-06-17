<template>
    <div>
        <ScheduleForm :year="year" :month="month" :day="day"></ScheduleForm>
        <h2>{{ currentDate.format("YYYY年MM月") }}</h2>
        <button @click="prevMonth">前の月</button>
        <button @click="nextMonth">次の月</button>
        <div class="month">
            <div v-for="week, index1 in calendars" :key="index1" class="week">
                <div v-for="day, index2 in week" :key="index2" class="day" @click="getDay(day.date)" :class="classShading(index1, day.date)">
                    <div >
                        {{ day.date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import ScheduleForm from "./ScheduleForm";
const yotei = [
    {
        schedule: "2021-06-14/21:00",
        untilTime: "2021-06-14/22:00",
        title: "予定A",
        detail: "予定Aです"
    },
    {
        schedule: "2021-06-15/21:00",
        untilTime: "2021-06-15/22:00",
        title: "予定B",
        detail: "予定Bです"
    },
    {
        schedule: "2021-06-16/21:00",
        untilTime: "2021-06-16/22:00",
        title: "予定C",
        detail: "予定Cです"
    },
    {
        schedule: "2021-06-17/21:00",
        untilTime: "2021-06-17/22:00",
        title: "予定C",
        detail: "予定Cです"
    },
]
export default {
    name: 'Calendar',
    data() {
        return {
            currentDate: moment(),
            year : "",
            month : "",
            day : "",
        };
    },
    computed: {
        calendars() {
            
            return this.getCalendar();
        }
    },
    components: {
        ScheduleForm
    },
    methods: {
        getStartDate() {
            //月の最初の日
            let date = moment(this.currentDate);
            date.startOf("month");
            //曜日
            const youbiNum = date.day();
            //日曜日の日付
            return date.subtract(youbiNum, "days");
        },
        getEndDate() {
            //月の最終日
            let date = moment(this.currentDate);
            date.endOf("month");
            //曜日
            const youbiNum = date.day();
            //"土"曜日の日付
            return date.add(6 - youbiNum, "days");
        },
        getCalendar() {
            let startDate = this.getStartDate();
            const endDate = this.getEndDate();
            //カレンダーの行数を決定する
            const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
            
            
            
            let calendars = [];
            //週の数だけループ
            for (let week = 0; week < weekNumber; week++) {
                
                let weekRow = [];
                //1週間の日にち分(７日)ループ
                for (let day = 0;  day < 7; day++) {
                    
                    // 日にちの取得
                    // startDate.get("date")
                    // if (startDate.get("date") === axios) {
                    //     {ireru}
                    // }
                    
                    weekRow.push({date: startDate.get("date")});
                    
                    
                    //日付を一日ずつ足していく
                    startDate.add(1, "days");
                    
                }
                calendars.push(weekRow);
            }
            return calendars;
        },
        nextMonth() {
            this.currentDate = moment(this.currentDate).add(1, "month");
        },
        prevMonth() {
            this.currentDate = moment(this.currentDate).subtract(1, "month");
        },
        classShading(index1, date) {
            //今月でない先月・来月か判別してクラスを変える
            if (index1 === 0 && date > 20) {
                
                return "thin"
            } else if (index1 >= 4 && date < 10) {
                
                return "thin"
            } else {
                
                return "dark"
            }
        },
        getDay(day) {
            // //先月と来月を判断できない
            let date = this.currentDate.format("YYYY-MM-") + day
            // console.log(date)
            this.year = this.currentDate.format("YYYY")
            this.month = this.currentDate.format("MM")
            this.day = day
            
        }
    },
}

</script>

<style>
.month {
    max-width:900px;
    margin: 0 auto;
    border-top:1px solid black;
}
.week {
    display:flex;
    border-left:1px solid black;
}
.day {
    flex:1;
    min-height:125px;
    border-right:1px solid black;
    border-bottom:1px solid black;
}
.thin {
    background-color: aqua;
    pointer-events: none
}
</style>
