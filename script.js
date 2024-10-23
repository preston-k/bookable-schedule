function accessDenied() {
  document.querySelector('#main-calendar').innerHTML = ''
  document.querySelector('#error').style.display = 'flex'
  document.title = 'Access Denied'
}
const dayCount = (year, month) => new Date(year, month, 0).getDate()
const urlParams = new URLSearchParams(window.location.search)
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let currentMonth = new Date().getMonth()
let date 
let month = new Date().getMonth() + 1
let monthWord = monthNames[currentMonth]
let year = new Date().getFullYear()
document.querySelector('#Df8m').innerHTML = monthWord + ' ' + year
let daysInMonth = dayCount(year, month)
if (urlParams.get('id') == '' || urlParams.get('id') == null) {
  accessDenied()
} else {
  date = new Date().toISOString().split('T')[0]
  let i = 1
  let monthstart = new Date(`${monthWord} 1, ${year} 12:00:00`).getDay()
  let week1 = new Array(7).fill(0)
  let week2 = new Array(7).fill(0)
  let week3 = new Array(7).fill(0)
  let week4 = new Array(7).fill(0)
  let week5 = new Array(7).fill(0)
  for (let j = monthstart; j < 7 && i <= daysInMonth; j++) {
    week1[j] = i++
  }
  for (let j = 0; j < 7 && i <= daysInMonth; j++) {
    week2[j] = i++
  }
  for (let j = 0; j < 7 && i <= daysInMonth; j++) {
    week3[j] = i++
  }
  for (let j = 0; j < 7 && i <= daysInMonth; j++) {
    week4[j] = i++
  }
  for (let j = 0; j < 7 && i <= daysInMonth; j++) {
    week5[j] = i++
  }
  for (let week = 1; week <= 5; week++) {
    console.log(week)
    let weekData = window[`week${week}`]
    for (let day = 1; day <= 7; day++) {
      let value = weekData[day - 1]
      let outerElement = document.querySelector(`#w${week}d${day}-outer`)
      let innerElement = document.querySelector(`#w${week}d${day}-inner`)
      if (value === 0) {
        outerElement.classList.add('shadow-box')
      } else if (value !== undefined) {
        innerElement.innerHTML = value
      }
    }
  }
}