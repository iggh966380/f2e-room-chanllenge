const btnForBg = document.querySelectorAll('.showcase-btn')
let imageUrl = []

function changePhoto(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
  try {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + web_token
      }
    })
    .then(res => { return res.json() })
    .then(res => { 
      room = res.room.map(data => {
        return data
      })
    })
    .then(res => {
      imageUrl = room[0].imageUrl.map(data => {
        return data   
      })
    })
  }
  catch (error) {
    console.log(error)
  }
}

btnForBg.forEach(item => {
  item.addEventListener('click', function () {
    item.classList.add('bg-full')
    const aside = document.querySelector('aside')
    aside.style.backgroundImage = `url(${imageUrl[item.id]})`
    for (let i = 0; i < btnForBg.length; i++) {
      if (btnForBg[i].id !== item.id) {
        if (btnForBg[i].classList.contains('bg-full')) {
          btnForBg[i].classList.remove('bg-full')
        }
      }
    }
  })
})

changePhoto()
