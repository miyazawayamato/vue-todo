<template>
    <div>
        <div class="overlay" v-show="showModal">
            <ScheduleForm :year="year" :month="month" :day="day" :close="closeModal" :schedules="schedules" class="modal"></ScheduleForm>
        </div>
        <h2>{{ currentDate.format("YYYY年MM月") }}</h2>
        <div class="month-change">
            <button @click="prevMonth">前の月</button>
            <button @click="nextMonth">次の月</button>
        </div>
        <div class="month">
            <div v-for="week, index1 in calendars" :key="index1" class="week">
                <div v-for="day, index2 in week" :key="index2" class="day" @click="getDay(day)" :class="classShading(index1, day.date)">
                    <div>
                        <p class="day-disp">{{ day.date }}</p>
                        <p class="noMonth">{{ day.todos.length }}件</p>
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
            schedules : [],
            showModal : false,
        };
    },
    asyncComputed: {
        async calendars() {
            let todoData = []
            await this.axios.get("https://9t39q121ri.execute-api.ap-northeast-1.amazonaws.com/dev?month=" + this.currentDate.format("YYYY-MM")).then((response) => {
                todoData = response.data
            })
            console.log(todoData)
            return this.getCalendar(todoData);
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
        getCalendar(todoData) {
            
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
                    
                    let current = startDate.get("date")
                    let todo = []
                    // 先月と来月の場合にはtodoを調べない
                    // weekが0かつ日にちが二桁 または weekがweekNumber-1かつ日にちが一桁
                    if((week == 0 && String(current).length == 2) || (week == weekNumber - 1 && String(current).length == 1)) {
                    } else {
                        for(let i = 0; i < todoData.length; i++) {
                            
                            if (current == Number(todoData[i]["daytime"].slice( 0, 2 )) ) {
                                todo.push(todoData[i])
                            }
                            
                        }
                        
                    }
                    
                    weekRow.push({date: current, todos : todo});
                    
                    
                    //日付を一日ずつ足していく
                    startDate.add(1, "days");
                    
                }
                calendars.push(weekRow);
            }
            
            // console.table(calendars)b
            
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
        getDay(dayData) {
            
            const day = dayData.date
            const todo = dayData.todos
            // let date = this.currentDate.format("YYYY-MM-") + day
            // console.log(date)
            this.year = this.currentDate.format("YYYY")
            this.month = this.currentDate.format("MM")
            this.day = day
            
            //日付順に並べる
            //日にちのカット
            this.schedules = todo
            
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
.month-change {
    margin: 10px 0;
}
.week {
    display:flex;
    border-left:1px solid black;
}
.day {
    flex:1;
    min-height:110px;
    border-right:1px solid black;
    border-bottom:1px solid black;
    cursor: pointer;
}
.thin {
    background-color: rgb(187, 184, 184);
    pointer-events: none
}
/* 今月出ないものの件数を非表示に */
.thin .noMonth{
    display: none;
}
.day-disp {
    font-weight: 600;
    font-size: 23px;
    margin: 5px 0 10px 0;
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
    width:40%;
    padding: 15px;
    background:#fff;
}
</style>
