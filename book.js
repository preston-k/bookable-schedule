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
  document.title = 'Access Denied'
}
const urlParams = new URLSearchParams(window.location.search)
let data
async function checkInvite() {
  if (urlParams.get('passthrough') == '' || urlParams.get('passthrough') == null || urlParams.get('passfrom') == '' || urlParams.get('passfrom') == null) {
    accessDenied()
  } else {
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
      
      document.querySelector('#fillable-d49ay').innerHTML = data.details.from
      document.querySelector('#fillable-q7f4w').innerHTML = data.details.from


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

  // FINAL STEP NOTHING BELOW

  window.location.replace(`/confirmed.html?passthrough=${JSON.stringify(data)}`)
})