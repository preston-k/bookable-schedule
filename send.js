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
let inviteid = crypto.randomUUID() 
let suggestions
document.querySelector('#h5j3l').innerHTML = inviteid
document.querySelector('#button-iymo1').addEventListener('click', () => {
  console.log('newsuggestion')
  document.querySelector('#suggestionbox').style.display = 'flex'
})

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
  const formattedTime = `${hours}:${minutes} ${period}`
  console.log(formattedTime)
  console.log(formattedDate)
  database.ref(`/invites/${inviteid}/suggest/${suggestId}`).update({
    date: formattedDate,
    time: formattedTime
  })
})