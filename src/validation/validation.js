export const validation = (postData) => {
    
    // const postData = {
    //     yearmonth: yearmonth,
    //     daytime: daytime,
    //     untilTime : untiltime,
    //     title : this.title,
    //     detail : this.text
    // }
    
    for(let k in postData) {
        if(!postData[k]) {
            return "未入力の項目があります";
        }
    }
    
    if (postData["title"].length > 20) {
        return "タイトルの文字数は20文字以内です"
    } else if (postData["detail"].length > 100) {
        return "タイトルの文字数は100文字以内です"

    }
    return ""
}