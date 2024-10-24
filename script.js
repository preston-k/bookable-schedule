const firebaseConfig = {
  apiKey: 'AIzaSyDaQPwR1rn633ZV-F6fb3ZY12_aT8d3BxE',
  authDomain: 'bookableschedule.firebaseapp.com',
  projectId: 'bookableschedule',
  storageBucket: 'bookableschedule.appspot.com',
  messagingSenderId: '891298873089',
  appId: '1:891298873089:web:de053844e86322f8456500'
}
firebase.initializeApp(firebaseConfig)
let database = firebase.database()
let offset = -(new Date().getTimezoneOffset() / 60)
function accessDenied() {
  document.querySelector('#error').style.display = 'flex'
  document.querySelector('#loader-wrap').style.display = 'none'
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
let info
let to
let from
document.querySelector('#Df8m').innerHTML = monthWord + ' ' + year
let daysInMonth = dayCount(year, month)
let id=urlParams.get('id')
async function checkInvite() {
  if (urlParams.get('id') == '' || urlParams.get('id') == null) {
    accessDenied()
  } else {
    const snapshot = await database.ref('/invites').once('value')
    let inviteFound = false

    snapshot.forEach(childSnapshot => {
      if (childSnapshot.key == urlParams.get('id')) {
        inviteFound = true
      }
    })

    let suggestList
    if (inviteFound) {
      
      const inviteSnapshot = await database.ref(`/invites/${urlParams.get('id')}/`).once('value')

      setTimeout(() => {
        document.querySelector('#loader-wrap').style.display = 'none'
      }, '875') // Save time in case extra things load not in an await
      info = inviteSnapshot.val()
      console.log(info['hide'])
      if (info['hide'] == true) {
        document.querySelector('#used').style.display='flex'
        document.querySelector('#main-calendar').innerHTML = ''
      }
      to = info['details']['to']
      from = info['details']['from']
      console.log(info)
      Object.values(info.suggest).forEach(obj => {
        console.log(obj)
        suggestList += `<a class='link-lruhj' href='/book.html?passthrough=${id}&action=book&passfrom=${obj.id}'><div class='suggested-timebox'> <div class='fbsyq'> <span class='material-symbols-outlined'> arrow_forward_ios </span> </div> <div class='suggested-timebox-date'> <img src='https://cdn.prestonkwei.com/calendaricon-black-small.png' class='img-qi5s' alt='Calendar Icon' draggable='false'> <p><span>${obj.date}</span></p> </div> <div class='suggested-timebox-time'> <img src='https://cdn.prestonkwei.com/clockicon-black-small.png' class='img-4od9' alt='Clock Icon' draggable='false'> <p><span>${obj.time}</span></p> </div> </div></a>`
      })
      suggestList = suggestList.replace(/undefined/g, '')
      document.querySelector('#pdufa').innerHTML = suggestList
      document.querySelectorAll('.sendname').forEach(element => element.innerHTML = to)
      document.querySelectorAll('.refname').forEach(element => element.innerHTML = from)
      date = new Date().toISOString().split('T')[0]
      let i = 1
      let monthstart = new Date(`${monthWord} 1, ${year} 12:00:00`).getDay()
      let week1 = new Array(7).fill(0)
      let week2 = new Array(7).fill(0)
      let week3 = new Array(7).fill(0)
      let week4 = new Array(7).fill(0)
      let week5 = new Array(7).fill(0)
      let weeks = [week1, week2, week3, week4, week5]
      let currentDay = 1

      for (let i = monthstart; i < 7 && currentDay <= daysInMonth; i++) {
        week1[i] = currentDay++
      }
      for (let weekNum = 1; weekNum < 5 && currentDay <= daysInMonth; weekNum++) {
        for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
          weeks[weekNum][i] = currentDay++
        }
      }

      for (let weekNum = 0; weekNum < 5; weekNum++) {
        for (let day = 0; day < 7; day++) {
          const outerElement = document.querySelector(`#w${weekNum + 1}d${day + 1}-outer`)
          const innerElement = document.querySelector(`#w${weekNum + 1}d${day + 1}-inner`)
          if (weeks[weekNum][day] === 0) {
            outerElement.classList.add('shadow-box')
          } else {
            innerElement.innerHTML = weeks[weekNum][day]
          }
        }
      }
    } else {
      accessDenied()
    }
  }
}

checkInvite()

if (urlParams.get('dev') == '1') {
  document.querySelector('#dev-avnzs').textContent = `inviteid: ${urlParams.get('id')}  ||  date:${date}, month:${month} || utc-off:${offset}`
  document.querySelector('#dev-avnzs').style.display = 'flex'
}