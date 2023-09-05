const moment=require('moment')
function formatMessage(username,text){
    return{
        username,
        text,
        time:moment().add(1,'h').format('h:mm a')
    }
}
console.log(moment())
module.exports=formatMessage