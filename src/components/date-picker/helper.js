const firstDayOfMonth = date => {
  let [year, month, day] = getYearMonthDate(date)
  return new Date(year, month, 1)
}
const lastDayOfMonth = date => {
  let temp = new Date(date.getTime())
  temp.setDate(1)
  let [year, month, day] = getYearMonthDate(temp)
  return new Date(year, month + 1, 0)
}
export {
  firstDayOfMonth,
  lastDayOfMonth
}
function getYearMonthDate(date){
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return [year, month, day]

}
