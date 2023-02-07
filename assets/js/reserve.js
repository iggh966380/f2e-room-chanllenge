let localCheckIn
let localCheckOut
const closeBtn = document.querySelector('.close')
const closeSuccessBtn = document.querySelector('.closeSuccessModal')
const modal = document.querySelector('#myModal')
const successModal = document.querySelector('#successModal')
const reserveModal = document.querySelector('.booking-now')


reserveModal.addEventListener('click', function() {
    localCheckIn = localStorage.getItem('checkInTime')
    localCheckOut = localStorage.getItem('checkOutTime')
    if (!localCheckOut) {
        alert('請先選擇入住與退房日期')
    } else {
        modal.classList.remove('d-none')
        reserve()
    }
})

closeBtn.addEventListener('click', function() {
  modal.classList.add('d-none')
})

closeSuccessBtn.addEventListener('click', function() {
  successModal.classList.add('d-none')
  window.location.reload()
})

function reserve() {
    const checkInDate = document.querySelector('#checkInDate')
    const checkOutDate = document.querySelector('#checkOutDate')
    checkInDate.value = localCheckIn
    checkOutDate.value = localCheckOut
  const reserveNight = []
    
  const checkInArr = localCheckIn.split('-').map(data => {
    return parseInt(data, 10)
  })
    
  const checkOutArr = localCheckOut.split('-').map(data => {
    return parseInt(data, 10)
  })

     
  let timeFormat = {
    year: Number,
    month: Number,
    date: Number
  }
    
    function isLeap(year, month, arr1, arr2) {
        if ((year % 4) === 0 && (year % 100) !== 0) {
            return arr1[month]
        } else if (year % 400 === 0) {
            return arr1[month]
        } else {
            return arr2[month]
        }
    }
    const monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const daysInThisMonth = isLeap(checkInArr[0], checkInArr[1] - 1, monthLeap, monthNormal)
    const daysInNextMonth = isLeap(checkInArr[0], checkInArr[1], monthLeap, monthNormal)
    
    if (checkInArr[0] === checkOutArr[0] && checkInArr[1] === checkOutArr[1] && checkInArr[2] !== checkOutArr[2]) {
        for (let i = checkInArr[2]; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkInArr[0],
                month: checkInArr[1],
                date: i
            }
            reserveNight.push(timeFormat)  
        }
    } else if (checkInArr[0] === checkOutArr[0] && checkInArr[1] !== checkOutArr[1]) {
        let count = 0
        for (let i = checkInArr[2]; i <= daysInThisMonth; i++) {
            timeFormat = {
                year: checkInArr[0],
                month: checkInArr[1],
                date: i
            }
            count += 1
            reserveNight.push(timeFormat)
        }
        if (checkOutArr[1] - checkInArr[1] > 1) {
            for (let i = 1; i <= daysInNextMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1] + 1,
                    date: i
                } 
                count += 1
                reserveNight.push(timeFormat)
            }
        }
        for (let i = 1; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkOutArr[0],
                month: checkOutArr[1],
                date: i
            }
            count += 1
            reserveNight.push(timeFormat)
        }
    } else if (checkInArr[0] !== checkOutArr[0]) {
        let count = 0
        console.log(checkInArr[1])
        if (12 - checkInArr[1] > 0) {
            for (let i = checkInArr[2]; i <= daysInThisMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1],
                    date: i
                }
                count += 1
                reserveNight.push(timeFormat) 
            }
            for (let i = 1; i <= daysInNextMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1] + 1,
                    date: i
                }
                count += 1
                reserveNight.push(timeFormat) 
            }
        } else if (12 - checkInArr[1] === 0) {
            for (let i = checkInArr[2]; i <= daysInThisMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1],
                    date: i
                }
                count += 1
                reserveNight.push(timeFormat) 
            }
        }
        for (let i = 1; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkOutArr[0],
                month: checkOutArr[1],
                date: i
            }
            count += 1
            reserveNight.push(timeFormat)
        }
    }
    console.log(reserveNight)
    
    const daysReserved = document.querySelector('#DaysReserved')
    
    daysReserved.textContent = `${reserveNight.length} 晚`
    
    function showPrice(url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`) {
        let price
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + web_token
                }
            })
            .then(res => { return res.json() })
            .then(res => { 
                price = res.room.map(data => {
                    return data
                })
            })
            .then(res => console.log(price[0].normalDayPrice))
            .then(res => console.log(price[0].holidayPrice))
            .then(res => {
                let totalPrice = 0
                for (const key in reserveNight) {
                    const day = new Date(reserveNight[key].year, reserveNight[key].month, reserveNight[key].date).getDay()
                    if (day === 6 || day === 0) {
                        totalPrice += price[0].holidayPrice
                    } else {
                        totalPrice += price[0].normalDayPrice
                    }
                }
                console.log(totalPrice)
                const totalPriceShow = document.querySelector('#totalPrice')
                totalPriceShow.textContent =`$ ${totalPrice}`
            })
        } catch (error) {
            console.log(error)
        }
    } 
    
    showPrice()
    
    const submitBtn = document.querySelector('#submitBtn')
    const inputName = document.querySelector('#input-name')
    const inputTel = document.querySelector('#input-phone')
    const newArr = []
    for (const key in reserveNight) {
        if(reserveNight[key].month < 10 && reserveNight[key].date < 10) {
            newArr.push(`${reserveNight[key].year}-0${reserveNight[key].month}-0${reserveNight[key].date}`)
        } else if (reserveNight[key].month < 10) {
            newArr.push(`${reserveNight[key].year}-0${reserveNight[key].month}-${reserveNight[key].date}`)
        } else if (reserveNight[key].date < 10) {
            newArr.push(`${reserveNight[key].year}-${reserveNight[key].month}-0${reserveNight[key].date}`)
        } else {
            newArr.push(`${reserveNight[key].year}-${reserveNight[key].month}-${reserveNight[key].date}`)
        }
    }
    console.log(newArr)
    
    submitBtn.addEventListener('click', submitPost)
    
    function submitPost() {
        const data = {
            name: inputName.value,
            tel: inputTel.value,
            date: newArr
        }
        console.log(data)
        try {
            fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                    authorization: 'Bearer ' + web_token
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
              const myModal = document.querySelector('#myModal')
              myModal.classList.add('d-none')
            })
            .then(res => {
              const successModal = document.querySelector('#successModal')
              successModal.classList.remove('d-none')
            })
        } catch (error) {
            console.log(error)
        }
    }   
}
