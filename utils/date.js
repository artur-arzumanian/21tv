const Schedule = require('../model/schedule')
const getDate = (date) => {
  return ('0' + date.getDate()).slice(-2) + '-'
         + ('0' + (date.getMonth()+1)).slice(-2) + '-'
         + date.getFullYear();
}

const getMilliseconds = (date) => {
  const day = new Date(date).getTime()
  const dayStart = new Date(new Date(date).toDateString()).getTime()
  return day - dayStart
}

const existingDateTime = async (startTime, endTime, dates, scheduleId = null) => {
  let condition = {$or: [{$and: [{startTime: {$lte: startTime}},{endTime: {$gte: startTime}}]},{$and:[{startTime: {$lte: endTime}},{endTime: {$gte: endTime}}]},{$and: [{startTime: {$gte: startTime}},{startTime: {$lte: endTime}}]}]};

  if (scheduleId) {
    condition = {$and :[
      {
        _id: {$ne: scheduleId}
      },
      condition
    ]};
  }
  const getSchedule = await Schedule.find(condition, {"dates":1})
 
  console.log("getSchedule = ", getSchedule);
  console.log("startTime =",startTime);
  console.log("endTime ",endTime);
  console.log("dates", dates);                      
  let allDates = getSchedule.reduce(function(aggr, val) {
    return aggr = [...val.dates];
  }, [])
  allDates = [...new Set(allDates)]
  console.log("allDates = ",allDates);
  let existingDates = [];
  for(let i = 0; i <  dates.length; i++){
    if (allDates.indexOf(dates[i]) !== -1){
      existingDates.push(dates[i]);      
    }
  }
  console.log("existingDates ",existingDates);
  if (existingDates.length > 0) {
    return ({error: "Conflict with time for dates: " + existingDates.join()})
  }

  
}

module.exports = {getDate, getMilliseconds, existingDateTime}