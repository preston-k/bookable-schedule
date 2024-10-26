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

function accessDenied() {
  document.querySelector('#passthrough-y354q').innerHTML = ''
  document.querySelector('#error').style.display = 'flex'
  document.querySelector('#loader-wrap').style.display = 'none'
  document.title = 'Access Denied'
}
const urlParams = new URLSearchParams(window.location.search)
let data
async function checkInvite() {
  if (urlParams.get('passthrough') == '' || urlParams.get('passthrough') == null || urlParams.get('passfrom') == '' || urlParams.get('passfrom') == null) {
    accessDenied()
  } else {
    setTimeout(() => {
      document.querySelector('#loader-wrap').style.display = 'none'
    }, '875')
    const snapshot = await database.ref('/invites').once('value')
    let inviteFound = false
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.key == urlParams.get('passthrough')) {
        inviteFound = true
      }
    })
    let passfrom = urlParams.get('passfrom')
    if (inviteFound) {
      const inviteSnapshot = await database.ref(`/invites/${urlParams.get('passthrough')}/`).once('value')
      data = inviteSnapshot.val()
      console.log(data)
      if (data.hide == true) {
        window.location.href = `/?id=${passfrom}`
      }
      // path: /obj/details/
      document.querySelector('#fillable-d49ay').innerHTML = data.details.from
      document.querySelector('#fillable-q7f4w').innerHTML = data.details.from
      // path: /obj/suggest/
      document.querySelector('#fillable-186yh').innerHTML = data.suggest[passfrom].date
      document.querySelector('#fillable-2z4aj').innerHTML = data.suggest[passfrom].time

      document.querySelector('#fillable-yiumm').innerHTML = data.details.notes

      document.querySelector('#fillable-jdmrg').innerHTML = data.details.eTo
      

    } else {
      accessDenied()
    }
  }
}
checkInvite()


document.querySelector('#button-hp8tv').addEventListener('click', () => {
  console.log('book')
  database.ref(`/invites/${urlParams.get('passthrough')}/suggest/${urlParams.get('passfrom')}`).update({
    booked: true
  })

  database.ref(`/invites/${urlParams.get('passthrough')}/`).update({
    hide: true
  })
  const data = new FormData()
  data.set('sendto', data.details.eTo, data.details.eFrom)
  data.set('from', data.details.eFrom)
  data.set('subject', `${data.details.to}, you're all set!`)
  data.set(
    'html',
    `<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body style='font-family: system-ui, sans-serif; background-color: #7EC8E3; margin: 0; padding: 20px;'> <table width='100%' cellspacing='0' cellpadding='0' border='0' style='background-color: #7EC8E3; padding: 20px;'> <tr> <td align='center'> <table width='600' cellspacing='0' cellpadding='20' border='0' style='background-color: white; border-radius: 8px;'> <tr></tr> <tr> <td style='font-size: 16px; line-height: 1.6;'> <p>Hi, ${data.details.to}!</p><p>We wanted to let you know that we have sucessfully received your booking! You have scheduled it for <strong>${data.suggest[passfrom].date}</strong> at <strong>${data.suggest[passfrom].time}</strong>. We will be sending calendar invites momentarily.</p><p>If you need to make any changes, please let ${data.details.from} know by replying to this email.</p></td> </tr> <tr> <td style='font-family: system-ui, sans-serif; font-size: 10px; text-align: center;'> <hr> <p>This email was sent on behalf of ${document.querySelector('#input-csc2e').value} who sent you this invite.</p> <p>PrestonKwei.com ⋅ PO Box 20987 ⋅ Oakland, CA 94620</p> <p>This is an unmonitored email address. Responses will not be received.</p> <a href='https://prestonkwei.com'><p>prestonkwei.com</p></a> </td> </tr> </table> </td> </tr> </table> </body> </html>`.replace(/undefined/g, '')
  )
  data.set(
    'content',
    `Sorry, this email didn't format correctly. Please contact the person who sent you this for help and more information. You can delete this email (or keep it, we won't mind).\n\nERR: html fail-- to content.`
  )
  fetch('https://emailserver.prestonkwei.com/email', {
    method: 'post',
    body: data,
  }).catch(() => {})
  
  // FINAL STEP NOTHING BELOW
  window.location.replace(`/confirmed.html?passthrough=${JSON.stringify(data)}`)
})