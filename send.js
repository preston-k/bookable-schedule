const firebaseConfig = {
  apiKey: 'AIzaSyDaQPwR1rn633ZV-F6fb3ZY12_aT8d3BxE',
  authDomain: 'bookableschedule.firebaseapp.com',
  projectId: 'bookableschedule',
  storageBucket: 'bookableschedule.appspot.com',
  messagingSenderId: '891298873089',
  appId: '1:891298873089:web:de053844e86322f8456500'
}
firebase.initializeApp(firebaseConfig)
function tree(obj, prefix = '') {
  const keys = Object.keys(obj)
  let html = ''

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1
    const value = typeof obj[key] === 'object' && obj[key] !== null ? '' : `: ${obj[key]}`
    
    html += `<p class='tree-es1rn'>${prefix}${isLast ? '└── ' : '├── '}${key}${value}</p>`
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      html += generateObjectTreeHTML(obj[key], `${prefix}${isLast ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '|&nbsp;&nbsp;&nbsp;'}`)
    }
  })

  return html
}



let offset = -(new Date().getTimezoneOffset() / 60)
let database = firebase.database()
let inviteid = crypto.randomUUID() 
let details = {'id':inviteid}
let suggestions
let suggestList = {}
document.querySelector('#h5j3l').innerHTML = inviteid
document.querySelector('#button-iymo1').addEventListener('click', () => {
  console.log('newsuggestion')
  document.querySelector('#suggestionbox').style.display = 'flex'
})
let newlist
document.querySelector('#suggest-date-time').addEventListener('submit', (event) => {
  event.preventDefault()
  let suggestId = `suggest-${crypto.randomUUID()}`
  console.log(document.querySelector('#input-2h940').value)
  console.log(document.querySelector('#input-xp65i').value)
  const date = new Date(document.querySelector('#input-2h940').value)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  let [hours, minutes] = document.querySelector('#input-xp65i').value.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`
  console.log(formattedTime)
  console.log(formattedDate)
  let curList = document.querySelector('#suggested-timeslist').innerHTML 
  newlist = curList += `<div class='suggest-preview'><span class='suggest-date'>${formattedDate}</span> @ <span class='suggest-time'>${formattedTime}</span></div>`
  document.querySelector('#suggested-timeslist').innerHTML = newlist
  database.ref(`/invites/${inviteid}/suggest/${suggestId}`).update({
    date: formattedDate,
    time: formattedTime,
    off: offset,
    id: suggestId
  })
  document.querySelector('#input-2h940').value = ''
  document.querySelector('#input-xp65i').value = ''
  document.querySelector('#suggestionbox').style.display = 'none'
})
document.querySelector('#rev-77go1').addEventListener('click', () => {
  console.log('review and send')
  details['to'] = document.querySelector('#input-m07mt').value
  details['eTo'] = document.querySelector('#input-8tka6').value
  details['eFrom'] = document.querySelector('#input-csc2e').value
  details['from'] = document.querySelector('#input-5ytqq').value
  console.log(details)
  document.querySelector('#mkdmh').innerHTML = tree(details)
  document.querySelector('#verify-wrap').style.display = 'flex'
})
document.querySelector('#verify-rkyev').addEventListener('click', () => {
  console.log('send')
  database.ref(`/invites/${inviteid}/`).update({
    details,
    ts: new Date(),
  })
  document.querySelector('#verify-wrap').style.display='none'
  // window.location.reload()
})