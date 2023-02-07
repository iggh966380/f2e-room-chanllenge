var thisMonth = document.querySelector('#thisMonth');
var nextMonth = document.querySelector('#nextMonth');
var thisSMonth = new Date().getMonth();
function calculateMonth(year, month, text) {
    var arr = [
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
    for (var i = 0; i < 12; i++) {
        if (month === i) {
            text.textContent = "".concat(arr[i], " ").concat(year);
        }
    }
}
function thisMonthHeader(year, month) {
    var timeHeader = document.querySelector('#thisHeaderH2');
    calculateMonth(year, month, timeHeader);
}
function nextMonthHeader(year, month) {
    var timeHeader = document.querySelector('#nextHeaderH2');
    calculateMonth(year, month, timeHeader);
}
function addHeaderList(month, id) {
    var div = document.createElement('div');
    var ul = document.createElement('ul');
    var dayArr = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 0; i < dayArr.length; i++) {
        var li = document.createElement('li');
        li.textContent = dayArr[i];
        ul.appendChild(li);
    }
    div.classList.add('body-list');
    div.id = id;
    div.appendChild(ul);
    month.appendChild(div);
}
function getDayStart(year, month) {
    var tempDate = new Date(year, month, 1).getDay();
    return tempDate;
}
function isLeap(year, month, arr1, arr2) {
    if (year % 4 === 0 && year % 100 !== 0) {
        return arr1[month];
    }
    else if (year % 400 === 0) {
        return arr1[month];
    }
    else {
        return arr2[month];
    }
}
var isStartTimeExist = false;
function refreshDays(year, month) {
    var currentDate = new Date().getDate();
    var monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var ul = document.createElement('ul');
    var div = document.querySelector('#body-1');
    var daysInThisMonth = isLeap(year, month, monthLeap, monthNormal);
    var emptyStr = getDayStart(year, month);
    var count = 0;
    ul.id = 'days';
    div.appendChild(ul);
    for (var i = 0; i < emptyStr; i++) {
        var emptyLi = document.createElement('li');
        emptyLi.id = count;
        ul.appendChild(emptyLi);
        count += 1;
    }
    var _loop_1 = function (i) {
        var daysLi = document.createElement('li');
        var isMoreThan90Days = addInvalid(year, month + 1, i);
        var currentMonth = new Date().getMonth();
        ul.appendChild(daysLi);
        daysLi.textContent = i;
        if (month + 1 < 10 && i > 10) {
            daysLi.id = "".concat(year, "-0").concat(month + 1, "-").concat(i);
        }
        else if (month > 10 && i < 10) {
            daysLi.id = "".concat(year, "-").concat(month + 1, "-0").concat(i);
        }
        else if (month < 10 && i < 10) {
            daysLi.id = "".concat(year, "-0").concat(month + 1, "-0").concat(i);
        }
        else {
            daysLi.id = "".concat(year, "-").concat(month + 1, "-").concat(i);
        }
        if (i <= currentDate && month === currentMonth) {
            daysLi.classList.add('invalid');
        }
        else if (isMoreThan90Days) {
            daysLi.classList.add('invalid');
        }
        else {
            daysLi.classList.add('pointer');
        }
        if (count === 6 || count === 7) {
            daysLi.classList.add('isHoliday');
        }
        if (!daysLi.classList.contains('invalid')) {
            daysLi.addEventListener('click', function () {
                if (!isStartTimeExist) {
                    localStorage.setItem('checkInTime', "".concat(year, "-").concat(month + 1, "-").concat(i));
                    isStartTimeExist = true;
                    daysLi.classList.add('checkInChoose');
                }
                else {
                    if (localStorage.checkInTime === "".concat(year, "-").concat(month + 1, "-").concat(i)) {
                        alert('不可重複選擇同一天');
                    }
                    else {
                        localStorage.setItem('checkOutTime', "".concat(year, "-").concat(month + 1, "-").concat(i));
                        daysLi.classList.add('checkOutChoose');
                    }
                }
            });
        }
        count += 1;
    };
    for (var i = 1; i <= daysInThisMonth; i++) {
        _loop_1(i);
    }
}
function refreshNextMonthDays(year, month) {
    var monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var ul = document.createElement('ul');
    var div = document.querySelector('#body-2');
    var daysInThisMonth = isLeap(year, month, monthLeap, monthNormal);
    var emptyStr = getDayStart(year, month);
    for (var i = 0; i < emptyStr; i++) {
        var emptyLi = document.createElement('li');
        ul.appendChild(emptyLi);
    }
    var _loop_2 = function (i) {
        var daysLi = document.createElement('li');
        var span = document.createElement('span');
        var isMoreThan90Days = addInvalid(year, month + 1, i);
        if (month + 1 < 10 && i > 10) {
            daysLi.id = "".concat(year, "-0").concat(month + 1, "-").concat(i);
        }
        else if (i < 10) {
            daysLi.id = "".concat(year, "-").concat(month + 1, "-0").concat(i);
        }
        else if (month + 1 < 10 && i < 10) {
            daysLi.id = "".concat(year, "-0").concat(month + 1, "-0").concat(i);
        }
        else {
            daysLi.id = "".concat(year, "-").concat(month + 1, "-").concat(i);
        }
        daysLi.textContent = i;
        if (isMoreThan90Days) {
            daysLi.classList.add('invalid');
        }
        else {
            daysLi.classList.add('pointer');
        }
        if (!daysLi.classList.contains('invalid')) {
            daysLi.addEventListener('click', function () {
                if (!isStartTimeExist) {
                    localStorage.setItem('checkInTime', "".concat(year, "-").concat(month + 1, "-").concat(i));
                    isStartTimeExist = true;
                    daysLi.classList.add('checkInChoose');
                }
                else {
                    localStorage.setItem('checkOutTime', "".concat(year, "-").concat(month + 1, "-").concat(i));
                    daysLi.classList.add('checkOutChoose');
                }
            });
        }
        ul.appendChild(daysLi);
    };
    for (var i = 1; i <= daysInThisMonth; i++) {
        _loop_2(i);
    }
    ul.id = 'next-days';
    div.appendChild(ul);
}
function refreshMonth(node, childNodes, parentNodes) {
    for (var i = 0; i < childNodes.length; i++) {
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
    var currentYear = new Date().getFullYear();
    thisMonthHeader(currentYear, thisSMonth);
    nextMonthHeader(currentYear, thisSMonth + 1);
    refreshDays(currentYear, thisSMonth);
    refreshNextMonthDays(currentYear, thisSMonth + 1);
    var thisHeader = document.querySelector('#thisHeader');
    var nextHeader = document.querySelector('#nextHeader');
    var event1 = document.createElement('div');
    var event2 = document.createElement('div');
    eventHandler(event1, thisHeader, '＜', 'prev');
    eventHandler(event2, nextHeader, '＞', 'next');
    document.querySelector('.prev').classList.add('display-none');
}
function addInvalid(year, month, date) {
    var monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var currentDate = new Date().getDate();
    var newArr;
    if (currentYear % 4 === 0 && currentYear % 100 !== 0) {
        newArr = monthLeap;
    }
    else if (currentYear % 400 === 0) {
        newArr = monthLeap;
    }
    else {
        newArr = monthNormal;
    }
    var expireYear = currentYear;
    var expireMonth = currentMonth + 2;
    var expireDate = currentDate + 90;
    for (var i = currentMonth; i < 11; i++) {
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
    }
    else if (year === expireYear && month > expireMonth) {
        return true;
    }
    else if (year === expireYear &&
        month === expireMonth &&
        date > expireDate) {
        return true;
    }
    else {
        return false;
    }
}
addInvalid();
addHeaderList(thisMonth, 'body-1');
addHeaderList(nextMonth, 'body-2');
render();
var switchNexMonth = document.querySelector('.next');
var click = thisSMonth;
var currentYear = new Date().getFullYear();
switchNexMonth.addEventListener('click', function () {
    var nextMonth = document.querySelector('#nextHeader').textContent;
    var days = document.querySelector('#days');
    var daysChild = days.childNodes;
    var daysParent = days.parentNode;
    var nextDays = document.querySelector('#next-days');
    var nextDaysChild = nextDays.childNodes;
    var nextDaysParent = nextDays.parentNode;
    var prev = document.querySelector('.prev');
    refreshMonth(days, daysChild, daysParent);
    refreshMonth(nextDays, nextDaysChild, nextDaysParent);
    if (click > 0) {
        prev.classList.remove('display-none');
    }
    click += 1;
    if (nextMonth === "\u5341\u4E8C\u6708 ".concat(currentYear)) {
        thisMonthHeader(currentYear, click);
        refreshDays(currentYear, click);
        click = -1;
        currentYear += 1;
        nextMonthHeader(currentYear, click + 1);
        refreshNextMonthDays(currentYear, click + 1);
    }
    else {
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
var prevMonth = document.querySelector('.prev');
prevMonth.addEventListener('click', function () {
    var thisHeader = document.querySelector('#thisHeader');
    var days = document.querySelector('#days');
    var daysChild = days.childNodes;
    var daysParent = days.parentNode;
    var nextDays = document.querySelector('#next-days');
    var nextDaysChild = nextDays.childNodes;
    var nextDaysParent = nextDays.parentNode;
    refreshMonth(days, daysChild, daysParent);
    refreshMonth(nextDays, nextDaysChild, nextDaysParent);
    if (thisHeader.textContent === "\u4E00\u6708 ".concat(currentYear)) {
        nextMonthHeader(currentYear, click);
        refreshNextMonthDays(currentYear, click);
        click = 11;
        currentYear -= 1;
        thisMonthHeader(currentYear, click);
        refreshDays(currentYear, click);
    }
    else {
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
var booking = [];
function getReserved() {
    try {
        fetch("https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id), {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token,
            },
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            for (var key in res.booking) {
                booking.push(res.booking[key].date);
            }
        })
            .then(function (res) {
            var li = document.querySelectorAll('li');
            console.log(li);
            for (var idx in li) {
                for (var key in booking) {
                    if (li[idx].id === booking[key]) {
                        li[idx].classList.add('invalid');
                        li[idx].classList.remove('pointer');
                    }
                }
            }
        })
            .then(function (res) { return isReserved(); });
    }
    catch (error) {
        console.log(error);
    }
}
getReserved();
function isReserved() {
    var liWithInvalid = document.querySelectorAll('li');
    var _loop_3 = function (i) {
        liWithInvalid[i].addEventListener('click', function (e) {
            if (liWithInvalid[i].classList.contains('invalid')) {
                e.preventDefault();
                alert('該天不可選擇');
            }
        });
    };
    for (var i = 0; i < liWithInvalid.length; i++) {
        _loop_3(i);
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
    }
    catch (error) {
        console.log(error);
    }
}
var clearBtn = document.querySelector('#clearReserve');
clearBtn.addEventListener('click', clearAllReserve);
