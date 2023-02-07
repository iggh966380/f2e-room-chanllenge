const roomDemo = document.querySelector('#roomDemo')
const bookKnow = document.querySelector('#bookKnow')

function showModal(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      header.classList.add('mb-10')
      roomDemo.appendChild(header)
    })
    .then(res => {
      const hr = document.createElement('hr')
      hr.classList.add('mb-10')
      roomDemo.appendChild(hr)
    })
    .then(res => {
      const roomAbout = document.createElement('div')
      roomAbout.id = 'modalAbout'
      roomAbout.classList.add('mb-10')
      roomDemo.appendChild(roomAbout)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#modalAbout')
      const guestNumber = document.createElement('span')
      guestNumber.textContent = room[0].descriptionShort.GuestMax + ' 人。 '
      roomAbout.appendChild(guestNumber)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#modalAbout')
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
      const roomAbout = document.querySelector('#modalAbout')
      const isBreakFast = document.createElement('span')
      if (room[0].amenities.Breakfast === true) {
        isBreakFast.textContent = '附早餐 。 '
      } else {
        isBreakFast.textContent = '不附早餐 。'
      }
      roomAbout.appendChild(isBreakFast)
    })
    .then(res => {  
      const roomAbout = document.querySelector('#modalAbout')
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
      const roomAbout = document.querySelector('#modalAbout')
      const footage = document.createElement('span')
      footage.textContent = room[0].descriptionShort.Footage + ' 平方公尺'
      roomAbout.appendChild(footage)
    })
    .then(res => {
        const price = document.createElement('p')
        price.textContent = `平日 (一至四) 價格: ${room[0].normalDayPrice} / 假日 (五至日) 價格: ${room[0].holidayPrice}`
        price.classList.add('mb-10')
        roomDemo.appendChild(price)
      })
      .then(res => {
          const settingModal = document.createElement('div')
          for (const [key, value] of Object.entries(room[0].amenities)){
            const createDiv = document.createElement('div')
            const icon = document.createElement('span')
            icon.classList.add('material-icons')
            icon.classList.add('md-24')
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
              settingModal.appendChild(createDiv)
            }
            settingModal.classList.add('d-flex')
            settingModal.classList.add('flex-around')
            settingModal.classList.add('mb-20')
            roomDemo.appendChild(settingModal)
          }
        })
  }
  catch (error) {
    console.log(error)
  }
}

function bookInfo(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
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
      const bookInfo = document.createElement('h1')
      bookInfo.textContent = '入住資訊'
      bookInfo.classList.add('mb-10')
      bookKnow.appendChild(bookInfo)
    })
    .then(res => {
      const hr = document.createElement('hr')
      hr.classList.add('mb-10')
      bookKnow.appendChild(hr)
    })
    .then(res => {
      const checkDate = document.createElement('p')
      checkDate.textContent = `- 入住時間: ${room[0].checkInAndOut.checkInEarly} (最早) / ${room[0].checkInAndOut.checkInLate} (最晚) 退房時間: ${room[0].checkInAndOut.checkOut}。請自行確認行程安排。`
      checkDate.classList.add('mb-10')
      bookKnow.appendChild(checkDate)
    })
    .then(res => {
        const def = document.createElement('p')
        def.textContent = `- 平日定義週一至週四 ; 假日定義週五及週日及國定假日。`
        def.classList.add('mb-10')
        bookKnow.appendChild(def)  
    })
    .then(res => {
        const assign = document.createElement('p')
        assign.textContent = `- 奈斯旅館全面禁止吸菸。`
        assign.classList.add('mb-10')
        bookKnow.appendChild(assign)  
    })
    .then(res => {
        const problem = document.createElement('p')
        problem.textContent = `- 若您有任何問題，請撥打02-33456789 (服務時間: 週一至週六10:00 ~ 18:00)。`
        problem.classList.add('mb-20')
        bookKnow.appendChild(problem)  
    })
  }
  catch (error) {
    console.log(error)
  }
}

bookInfo()
showModal()
