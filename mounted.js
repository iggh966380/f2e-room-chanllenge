const web_token = 'xIfYLF1EB7fNzlmpRE8ZXiCM7r4JG3EZo0VBfNQd9CaOMjsMYV4NY6P8kqOw'
const img_area = document.querySelector('#photo')
const button = document.querySelector('#button')
let roomInfo = []

async function getData(url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms') {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + web_token
      }
    })
    return response.json()
  }
  catch (error) {
    console.log(error)
  }
}

getData()
  .then(res =>  {
    roomInfo = res.items.map(data => {
      return data
    })
    for(const key in roomInfo) {
      let link = document.createElement('a')
      let text = document.createElement('span')
      link.href = `./booking.html`
      link.classList.add('d-flex')
      link.classList.add('showcase-img')
      link.classList.add('bg-center')
      text.classList.add('d-none')
      link.id = key
      link.style.backgroundImage = `url(${roomInfo[key].imageUrl})`
      text.textContent = `${roomInfo[key].name}`
      img_area.append(link)
      link.append(text)
    }

    const link = document.querySelectorAll('a')

    link.forEach(item => {
      const text = item.childNodes
      item.addEventListener('mouseenter', function () {
        text[0].classList.remove('d-none')
        item.classList.add('overlay')
      })

      item.addEventListener('mouseleave', function () {
        text[0].classList.add('d-none')
        item.classList.remove('overlay')
      })

      item.addEventListener('click', function () {
        localStorage.id = roomInfo[item.id].id
      })
    })
  })

for (let i = 0; i < 4; i++) {
  let btn = document.createElement('button')
  btn.classList.add('showcase-btn')
  btn.classList.add('bg-none')
  btn.id = `${i}`
  button.append(btn)
}