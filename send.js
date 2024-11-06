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
  details['notes'] = document.querySelector('#input-tnl3p').value
  if (document.querySelector('#input-tnl3p').value == '') {
    details['notes'] = 'No notes were left!'
  }
  console.log(details)
  document.querySelector('#mkdmh').innerHTML = tree(details)
  document.querySelector('#verify-wrap').style.display = 'flex'
})
let invitelist

document.querySelector('#verify-rkyev').addEventListener('click', async () => {
  console.log('send')
  database.ref(`/invites/${inviteid}/`).update({
    details,
    ts: new Date(),
    hide: false
  })
  document.querySelector('#verify-wrap').style.display='none'
  const snapshot = await database.ref(`/invites/${inviteid}/`).once('value')
  console.log(snapshot.val().suggest)
  Object.values(snapshot.val().suggest).forEach(obj => {
    if (obj != undefined && obj != null) {
      console.log(obj.id)
      invitelist += `<a href='https://schedule.prestonkwei.com/book.html?passthrough=${inviteid}&action=book&passfrom=${obj.id}' style='text-decoration: none; color: black; all: unset; display: block;'> <div style='width: 100%; border: 2px solid black; border-radius: 10px; position: relative; cursor: pointer; transition: transform 0.2s ease-out; margin-bottom: 15px;'> <div style='display: flex; align-items: center; height: 50px;'> <img src='https://cdn.prestonkwei.com/calendaricon-black-small.png' alt='Calendar Icon' draggable='false' style='width: 50px; height: 50px; border-right: 2px solid black; margin-right: 5px;'> <p><span>${obj.date}</span></p> </div> <div style='display: flex; align-items: center; height: 50px;'> <img src='https://cdn.prestonkwei.com/clockicon-black-small.png' alt='Clock Icon' draggable='false' style='width: 50px; height: 50px; border-right: 2px solid black; margin-right: 5px;'> <p><span>${obj.time}</span></p> </div> </div> </a>`
    }
  })
  console.log(invitelist)
  const data = new FormData()
  data.set('sendto', document.querySelector('#input-8tka6').value )
  data.set('from', document.querySelector('#input-csc2e').value)
  data.set('subject', `${document.querySelector('#input-5ytqq').value} has suggested meeting sometime soon!`)
  data.set(
    'html',
    `<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='font-family: system-ui, sans-serif; background-color: #7EC8E3; margin: 0; padding: 20px;'> <table width='100%' cellspacing='0' cellpadding='0' border='0' style='background-color: #7EC8E3; padding: 20px;'> <tr> <td align='center'> <table width='600' cellspacing='0' cellpadding='20' border='0' style='background-color: white; border-radius: 8px;'> <tr></tr> <tr> <td style='font-size: 16px; line-height: 1.6;'> <p>Hi, ${document.querySelector('#input-m07mt').value}!</p><p>${document.querySelector('#input-5ytqq').value} would like to meet with you, and has suggested the following times.</p> ${invitelist} <p>Prefer a different time? View <a href='https://schedule.prestonkwei.com/?id=${inviteid}'>${document.querySelector('#input-5ytqq').value}'s availability here.</a></td> </tr> <tr> <td style='font-family: system-ui, sans-serif; font-size: 10px; text-align: center;'> <hr> <p>This email was sent on behalf of ${document.querySelector('#input-csc2e').value} who sent you this invite.</p> <p>PrestonKwei.com ⋅ PO Box 20987 ⋅ Oakland, CA 94620</p> <p>This is an unmonitored email address. Responses will not be received.</p> <a href='https://prestonkwei.com'><p>prestonkwei.com</p></a> </td> </tr> </table> </td> </tr> </table> </body> </html>`.replace(/undefined/g, '')
  )
  data.set(
    'content',
    `Sorry, this email didn't format correctly. Please contact the person who sent you this for help and more information. You can delete this email (or keep it, we won't mind).\n\nERR: html fail to content.`
  )
  fetch('https://emailserver.prestonkwei.com/email', {
    method: 'post',
    body: data,
  }).catch(() => {})
  // window.location.reload()
})
