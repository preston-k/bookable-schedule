
function createConfetti() {
  const colors = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFBE0B','#FF006E','#8338EC','#3A86FF']
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight * 0.2

      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = startX + 'px'
      confetti.style.top = startY + 'px'

      document.body.appendChild(confetti)
      const angle = Math.random() * Math.PI * 2
      const velocity = 5 + Math.random() * 10
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity
      let rotation = Math.random() * 360
      const rotationSpeed = (Math.random() - 0.5) * 10
      let x = startX
      let y = startY
      const gravity = 0.2
      let velocityY = vy
      function animate() {
        if (y > window.innerHeight) {
          confetti.remove()
          return
        }
        x += vx * 0.3;
        velocityY += gravity
        y += velocityY
        rotation += rotationSpeed

        confetti.style.left = x + 'px'
        confetti.style.top = y + 'px'
        confetti.style.transform = `rotate(${rotation}deg)`

        x += Math.sin(y * 0.1) * 0.5
        requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => confetti.remove(), 5000)
    }, Math.random() * 500)
  }
}
createConfetti()
const urlParams = new URLSearchParams(window.location.search)
let data = JSON.parse(urlParams.get('passthrough'))
console.log(data)