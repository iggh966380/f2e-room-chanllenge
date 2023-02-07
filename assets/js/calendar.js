const thisMonth = document.querySelector('#thisMonth');
const nextMonth = document.querySelector('#nextMonth');
const thisSMonth = new Date().getMonth();

function calculateMonth(year, month, text) {
  const arr = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];
  for (let i = 0; i < 12; i++) {
    if (month === i) {
      text.textContent = `${arr[i]} ${year}`;
    }
  }
}

function thisMonthHeader(year, month) {
  const timeHeader = document.querySelector('#thisHeaderH2');
  calculateMonth(year, month, timeHeader);
}

function nextMonthHeader(year, month) {
  const timeHeader = document.querySelector('#nextHeaderH2');
  calculateMonth(year, month, timeHeader);
}

function addHeaderList(month, id) {
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  const dayArr = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i = 0; i < dayArr.length; i++) {
    const li = document.createElement('li');
    li.textContent = dayArr[i];
    ul.appendChild(li);
  }
  div.classList.add('body-list');
  div.id = id;
  div.appendChild(ul);
  month.appendChild(div);
}

function getDayStart(year, month) {
  const tempDate = new Date(year, month, 1).getDay();
  return tempDate;
}

function isLeap(year, month, arr1, arr2) {
  if (year % 4 === 0 && year % 100 !== 0) {
    return arr1[month];
  } else if (year % 400 === 0) {
    return arr1[month];
  } else {
    return arr2[month];
  }
}

let isStartTimeExist = false;
function refreshDays(year, month) {
  const currentDate = new Date().getDate();
  const monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const ul = document.createElement('ul');
  const div = document.querySelector('#body-1');
  const daysInThisMonth = isLeap(year, month, monthLeap, monthNormal);
  const emptyStr = getDayStart(year, month);
  let count = 0;
  ul.id = 'days';
  div.appendChild(ul);
  for (let i = 0; i < emptyStr; i++) {
    const emptyLi = document.createElement('li');
    emptyLi.id = count;
    ul.appendChild(emptyLi);
    count += 1;
  }
  for (let i = 1; i <= daysInThisMonth; i++) {
    const daysLi = document.createElement('li');
    const isMoreThan90Days = addInvalid(year, month + 1, i);
    const currentMonth = new Date().getMonth();
    ul.appendChild(daysLi);
    daysLi.textContent = i;
    if (month + 1 < 10 && i > 10) {
      daysLi.id = `${year}-0${month + 1}-${i}`;
    } else if (month > 10 && i < 10) {
      daysLi.id = `${year}-${month + 1}-0${i}`;
    } else if (month < 10 && i < 10) {
      daysLi.id = `${year}-0${month + 1}-0${i}`;
    } else {
      daysLi.id = `${year}-${month + 1}-${i}`;
    }
    if (i <= currentDate && month === currentMonth) {
      daysLi.classList.add('invalid');
    } else if (isMoreThan90Days) {
      daysLi.classList.add('invalid');
    } else {
      daysLi.classList.add('pointer');
    }
    if (count === 6 || count === 7) {
      daysLi.classList.add('isHoliday');
    }
    if (!daysLi.classList.contains('invalid')) {
      daysLi.addEventListener('click', function () {
        if (!isStartTimeExist) {
          localStorage.setItem('checkInTime', `${year}-${month + 1}-${i}`);
          isStartTimeExist = true;
          daysLi.classList.add('checkInChoose');
        } else {
          if (localStorage.checkInTime === `${year}-${month + 1}-${i}`) {
            alert('不可重複選擇同一天');
          } else {
            localStorage.setItem('checkOutTime', `${year}-${month + 1}-${i}`);
            daysLi.classList.add('checkOutChoose');
          }
        }
      });
    }
    count += 1;
  }
}

function refreshNextMonthDays(year, month) {
  const monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const ul = document.createElement('ul');
  const div = document.querySelector('#body-2');
  const daysInThisMonth = isLeap(year, month, monthLeap, monthNormal);
  const emptyStr = getDayStart(year, month);
  for (let i = 0; i < emptyStr; i++) {
    const emptyLi = document.createElement('li');
    ul.appendChild(emptyLi);
  }
  for (let i = 1; i <= daysInThisMonth; i++) {
    const daysLi = document.createElement('li');
    const span = document.createElement('span');
    const isMoreThan90Days = addInvalid(year, month + 1, i);
    if (month + 1 < 10 && i > 10) {
      daysLi.id = `${year}-0${month + 1}-${i}`;
    } else if (i < 10) {
      daysLi.id = `${year}-${month + 1}-0${i}`;
    } else if (month + 1 < 10 && i < 10) {
      daysLi.id = `${year}-0${month + 1}-0${i}`;
    } else {
      daysLi.id = `${year}-${month + 1}-${i}`;
    }
    daysLi.textContent = i;
    if (isMoreThan90Days) {
      daysLi.classList.add('invalid');
    } else {
      daysLi.classList.add('pointer');
    }
    if (!daysLi.classList.contains('invalid')) {
      daysLi.addEventListener('click', function () {
        if (!isStartTimeExist) {
          localStorage.setItem('checkInTime', `${year}-${month + 1}-${i}`);
          isStartTimeExist = true;
          daysLi.classList.add('checkInChoose');
        } else {
          localStorage.setItem('checkOutTime', `${year}-${month + 1}-${i}`);
          daysLi.classList.add('checkOutChoose');
        }
      });
    }
    ul.appendChild(daysLi);
  }
  ul.id = 'next-days';
  div.appendChild(ul);
}

function refreshMonth(node, childNodes, parentNodes) {
  for (let i = 0; i < childNodes.length; i++) {
    childNodes[i].textContent = '';
  }
  parentNodes.removeChild(node);
}

function eventHandler(event, body, text, direction) {
  event.textContent = text;
  event.classList.add(direction);
  event.classList.add('justify-self-end');
  event.classList.add('text-big');
  body.appendChild(event);
}

function render() {
  const currentYear = new Date().getFullYear();
  thisMonthHeader(currentYear, thisSMonth);
  nextMonthHeader(currentYear, thisSMonth + 1);
  refreshDays(currentYear, thisSMonth);
  refreshNextMonthDays(currentYear, thisSMonth + 1);
  const thisHeader = document.querySelector('#thisHeader');
  const nextHeader = document.querySelector('#nextHeader');
  const event1 = document.createElement('div');
  const event2 = document.createElement('div');
  eventHandler(event1, thisHeader, '＜', 'prev');
  eventHandler(event2, nextHeader, '＞', 'next');
  document.querySelector('.prev').classList.add('display-none');
}

function addInvalid(year, month, date) {
  const monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  let newArr;
  if (currentYear % 4 === 0 && currentYear % 100 !== 0) {
    newArr = monthLeap;
  } else if (currentYear % 400 === 0) {
    newArr = monthLeap;
  } else {
    newArr = monthNormal;
  }
  let expireYear = currentYear;
  let expireMonth = currentMonth + 2;
  let expireDate = currentDate + 90;
  for (let i = currentMonth; i < 11; i++) {
    expireDate = expireDate - newArr[i];
    if (expireDate > 0) {
      if (i + 2 > 12) {
        expireYear += 1;
        i = -1;
      }
      expireMonth = i + 2;
    }
  }
  if (year > expireYear) {
    return true;
  } else if (year === expireYear && month > expireMonth) {
    return true;
  } else if (
    year === expireYear &&
    month === expireMonth &&
    date > expireDate
  ) {
    return true;
  } else {
    return false;
  }
}

addInvalid();
addHeaderList(thisMonth, 'body-1');
addHeaderList(nextMonth, 'body-2');
render();

const switchNexMonth = document.querySelector('.next');
let click = thisSMonth;

let currentYear = new Date().getFullYear();
switchNexMonth.addEventListener('click', function () {
  const nextMonth = document.querySelector('#nextHeader').textContent;
  const days = document.querySelector('#days');
  const daysChild = days.childNodes;
  const daysParent = days.parentNode;
  const nextDays = document.querySelector('#next-days');
  const nextDaysChild = nextDays.childNodes;
  const nextDaysParent = nextDays.parentNode;
  const prev = document.querySelector('.prev');
  refreshMonth(days, daysChild, daysParent);
  refreshMonth(nextDays, nextDaysChild, nextDaysParent);
  if (click > 0) {
    prev.classList.remove('display-none');
  }
  click += 1;
  if (nextMonth === `十二月 ${currentYear}`) {
    thisMonthHeader(currentYear, click);
    refreshDays(currentYear, click);
    click = -1;
    currentYear += 1;
    nextMonthHeader(currentYear, click + 1);
    refreshNextMonthDays(currentYear, click + 1);
  } else {
    thisMonthHeader(currentYear, click);
    nextMonthHeader(currentYear, click + 1);
    refreshDays(currentYear, click);
    refreshNextMonthDays(currentYear, click + 1);
  }
  console.log(click);
  if (click > 12) {
    click = 0;
  }
  getReserved();
});

const prevMonth = document.querySelector('.prev');

prevMonth.addEventListener('click', function () {
  const thisHeader = document.querySelector('#thisHeader');
  const days = document.querySelector('#days');
  const daysChild = days.childNodes;
  const daysParent = days.parentNode;
  const nextDays = document.querySelector('#next-days');
  const nextDaysChild = nextDays.childNodes;
  const nextDaysParent = nextDays.parentNode;
  refreshMonth(days, daysChild, daysParent);
  refreshMonth(nextDays, nextDaysChild, nextDaysParent);
  if (thisHeader.textContent === `一月 ${currentYear}`) {
    nextMonthHeader(currentYear, click);
    refreshNextMonthDays(currentYear, click);
    click = 11;
    currentYear -= 1;
    thisMonthHeader(currentYear, click);
    refreshDays(currentYear, click);
  } else {
    thisMonthHeader(currentYear, click - 1);
    nextMonthHeader(currentYear, click);
    refreshDays(currentYear, click - 1);
    refreshNextMonthDays(currentYear, click);
  }
  click -= 1;
  if (click === thisSMonth) {
    document.querySelector('.prev').classList.add('display-none');
  }
  getReserved();
});

let booking = [];
function getReserved() {
  try {
    fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + web_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        for (const key in res.booking) {
          booking.push(res.booking[key].date);
        }
      })
      .then((res) => {
        const li = document.querySelectorAll('li');
        console.log(li);
        for (const idx in li) {
          for (const key in booking) {
            if (li[idx].id === booking[key]) {
              li[idx].classList.add('invalid');
              li[idx].classList.remove('pointer');
            }
          }
        }
      })
      .then((res) => isReserved());
  } catch (error) {
    console.log(error);
  }
}

getReserved();

function isReserved() {
  const liWithInvalid = document.querySelectorAll('li');
  for (let i = 0; i < liWithInvalid.length; i++) {
    liWithInvalid[i].addEventListener('click', function (e) {
      if (liWithInvalid[i].classList.contains('invalid')) {
        e.preventDefault();
        alert('該天不可選擇');
      }
    });
  }
}

function clearAllReserve() {
  try {
    fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + web_token,
      },
    })
      .then(window.location.reload())
      .then(localStorage.removeItem('checkInTime'))
      .then(localStorage.removeItem('checkOutTime'));
  } catch (error) {
    console.log(error);
  }
}

const clearBtn = document.querySelector('#clearReserve');

clearBtn.addEventListener('click', clearAllReserve);
