const btn = document.querySelectorAll('.showcase-btn')
const bg = document.querySelector('#bg')

btn.forEach(item => {
  item.addEventListener('click', function () {
    item.classList.add('bg-full')
    for (let i = 0; i < btn.length; i++) {
      if (btn[i].id !== item.id) {
        if (btn[i].classList.contains('bg-full')) {
          btn[i].classList.remove('bg-full')
        }
      }
    }
    bg.style.backgroundImage = `url(./img/house/bg${item.id}.jpeg)`
  })
})
