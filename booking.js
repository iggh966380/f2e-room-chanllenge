const web_token = 'xIfYLF1EB7fNzlmpRE8ZXiCM7r4JG3EZo0VBfNQd9CaOMjsMYV4NY6P8kqOw'
const id = localStorage.id
const roomInfo = document.querySelector('#roomInfo')
const roomShowcase = document.querySelector('#roomShowcase')
const info = document.querySelector('#bookingInfo')
const description_area = document.querySelector('#description')
const btn = document.querySelector('#button')
let room

function showHeader(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const header = document.createElement('h1')
      header.textContent = room[0].name
      roomShowcase.appendChild(header)
    })
    .then(res => {
      const roomAbout = document.createElement('div')
      roomAbout.id = 'roomAbout'
      roomShowcase.appendChild(roomAbout)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#roomAbout')
      const guestNumber = document.createElement('span')
      guestNumber.textContent = room[0].descriptionShort.GuestMax + ' 人。 '
      roomAbout.appendChild(guestNumber)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#roomAbout')
      const bedType = document.createElement('span')
      if (room[0].descriptionShort.Bed[0] === 'Single') {
        bedType.textContent = ' 單人床。 '
      }
      if (room[0].descriptionShort.Bed[0] === 'Small Double') {
        bedType.textContent = ' 小型雙人床。 '
      }
      if (room[0].descriptionShort.Bed[0] === 'Double') {
        bedType.textContent = ' 雙人床。 '
      }
      if (room[0].descriptionShort.Bed[0] === 'Queen') {
        bedType.textContent = ' 加大雙人床。 '
      }
      roomAbout.appendChild(bedType)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#roomAbout')
      const isBreakFast = document.createElement('span')
      if (room[0].amenities.Breakfast === true) {
        isBreakFast.textContent = '附早餐 。 '
      } else {
        isBreakFast.textContent = '不附早餐 。'
      }
      roomAbout.appendChild(isBreakFast)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#roomAbout')
      const bathNumber = document.createElement('span')
      if (Object.values(room[0].descriptionShort)[3] === 1) {
        bathNumber.textContent = '衛浴 1 間 。 '
      }
      if (Object.values(room[0].descriptionShort)[3] === 2) {
        bathNumber.textContent = '衛浴 2 間 。 '
      }
      roomAbout.appendChild(bathNumber)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#roomAbout')
      const footage = document.createElement('span')
      footage.textContent = room[0].descriptionShort.Footage + ' 平方公尺'
      roomAbout.appendChild(footage)
    })
  }
  catch (error) {
    console.log(error)
  }
}

function bookingInfo(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const price = document.createElement('p')
      price.textContent = `平日 (一至四) 價格: ${room[0].normalDayPrice} / 假日 (五至日) 價格: ${room[0].holidayPrice}`
      info.appendChild(price)
    })
    .then(res => {
      const checkDate = document.createElement('p')
      checkDate.textContent = `入住時間: ${room[0].checkInAndOut.checkInEarly} (最早) / ${room[0].checkInAndOut.checkInLate} (最晚)`
      info.appendChild(checkDate)
    })
    .then(res => {
      const checkOut = document.createElement('p')
      checkOut.textContent = '退房時間: ' + room[0].checkInAndOut.checkOut
      info.appendChild(checkOut)
    })
  }
  catch (error) {
    console.log(error)
  }
}

function description(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const ul = document.querySelector('#describes')
      const article = room[0].description
      const newArr = article.split('.')
      for (const key in newArr) {
        if (newArr[key].length > 0) {
          const item = document.createElement('li')
          item.textContent = `- ${newArr[key]}`
          ul.append(item)
        }
      }
    })
  }
  catch (error) {
    console.log(error)
  }
}

function setting(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const setting = document.querySelector('#setting')
      for (const [key, value] of Object.entries(room[0].amenities)){
        const createDiv = document.createElement('div')
        const icon = document.createElement('span')
        icon.classList.add('material-icons')
        icon.classList.add('md-48')
        if (value === true) {
          if (key === 'Air-Conditioner') {
            icon.textContent = 'air'
            createDiv.textContent = '空調'
          } else if (key === 'Breakfast') {
            icon.textContent = 'restaurant'
            createDiv.textContent = '早餐'
          } else if (key === 'Child-Friendly') {
            icon.textContent = 'escalator_warning'
            createDiv.textContent = '適合兒童'
          } else if (key === 'Great-View') {
            icon.textContent = 'landscape'
            createDiv.textContent = '景緻美麗'
          } else if (key === 'Mini-Bar') {
            icon.textContent = 'local_bar'
            createDiv.textContent = '小酒吧'
          } else if (key === 'Pet-Friendly') {
            icon.textContent = 'pets'
            createDiv.textContent = '寵物友善'
          } else if (key === 'Refrigerator') {
            icon.textContent = 'kitchen'
            createDiv.textContent = '冰箱'
          } else if (key === 'Room-Service') {
            icon.textContent = 'call'
            createDiv.textContent = '客房服務'
          } else if (key === 'Smoke-Free') {
            icon.textContent = 'smoke_free'
            createDiv.textContent = '禁菸'
          } else if (key === 'Sofa') {
            icon.textContent = 'chair'
            createDiv.textContent = '沙發'
          } else if (key === 'Television') {
            icon.textContent = 'tv'
            createDiv.textContent = '電視'
          } else if (key === 'Wi-Fi') {
            icon.textContent = 'wifi'
            createDiv.textContent = '無線網路'
          } 
        }
        createDiv.prepend(icon)
        createDiv.classList.add('d-flex')
        createDiv.classList.add('flex-column')
        createDiv.classList.add('justify-center')
        createDiv.classList.add('align-center')
        if (createDiv.textContent.length > 0) {
          setting.appendChild(createDiv)
        }
      }
    })
  }
  catch (error) {
    console.log(error)
  }

}

function showPhoto(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const aside = document.querySelector('aside')
      aside.style.backgroundImage = `url(${room[0].imageUrl[0]})`
    })
  }
  catch (error) {
    console.log(error)
  }
}

function showPrice(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const area = document.querySelector('.around')
      const price = document.createElement('p')
      const priceSpan = document.createElement('span')
      const date = new Date().getDay()
      if (date === 1 || date === 2 || date === 3 || date === 4) {
        priceSpan.textContent = '$ ' + room[0].normalDayPrice
      } else {
        priceSpan.textContent = '$ ' + room[0].holidayPrice
      }
      priceSpan.classList.add('text-big')
      const one = document.createElement('span')
      one.textContent = ' / 1晚'
      price.appendChild(priceSpan)
      price.appendChild(one)
      area.prepend(price)
    })
  }
  catch (error) {
    console.log(error)
  }
}

function createBtn () {
  for (let i = 0; i < 3; i++) {
    let btn = document.createElement('button')
    btn.classList.add('showcase-btn')
    btn.classList.add('bg-none')
    btn.id = `${i}`
    button.append(btn)
  }
}

showHeader()
showPrice()
bookingInfo()
description()
setting()
showPhoto()
createBtn()
