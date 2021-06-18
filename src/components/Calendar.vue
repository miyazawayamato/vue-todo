<template>
    <div>
        <div class="overlay" v-show="showModal">
            <ScheduleForm :year="year" :month="month" :day="day" :close="closeModal" class="modal"></ScheduleForm>
        </div>
        <h2>{{ currentDate.format("YYYY年MM月") }}</h2>
        <button @click="prevMonth">前の月</button>
        <button @click="nextMonth">次の月</button>
        <div class="month">
            <div v-for="week, index1 in calendars" :key="index1" class="week">
                <div v-for="day, index2 in week" :key="index2" class="day" @click="getDay(day.date)" :class="classShading(index1, day.date)">
                    <div>
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
export default {
    name: 'Calendar',
    data() {
        return {
            currentDate: moment(),
            year : "",
            month : "",
            day : 0,
            showModal : false
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
        async getCalendar() {
            
            let startDate = this.getStartDate();
            const endDate = this.getEndDate();
            //カレンダーの行数を決定する
            const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
            // {untilTime: "03-23:52", detail: "テスト", yearmonth: "2021-06", daytime: "03-22:52", title: "テスト"}
            let todoData = []
            // await this.axios.get("https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev?month=" + this.currentDate.format("YYYY-MM")).then((response) => {
            //     todoData = response.data
            // })
            
            let calendars = [];
            //週の数だけループ
            for (let week = 0; week < weekNumber; week++) {
                
                let weekRow = [];
                //1週間の日にち分(７日)ループ
                for (let day = 0;  day < 7; day++) {
                    // console.log(startDate.get("date"))
                    let todo = []
                    for(let i = 0; i < todoData.length; i++) {
                        
                        if (startDate.get("date") == Number(todoData[i]["daytime"].slice( 0, 2 ))) {
                            todo.push(todoData[i])
                        }
                        
                    }
                    
                    weekRow.push({date: startDate.get("date"), todos : todo});
                    
                    
                    //日付を一日ずつ足していく
                    startDate.add(1, "days");
                    
                }
                calendars.push(weekRow);
            }
            console.table(calendars)
            
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
            this.showModal = true
            
        },
        closeModal() {
            this.showModal = false
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
    cursor: pointer;
}
.thin {
    background-color: aqua;
    pointer-events: none
}
.overlay {
    z-index:1;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal {
    z-index:2;
    width:50%;
    padding: 1em;
    background:#fff;
}
</style>
