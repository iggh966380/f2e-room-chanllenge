var web_token = 'xIfYLF1EB7fNzlmpRE8ZXiCM7r4JG3EZo0VBfNQd9CaOMjsMYV4NY6P8kqOw';
var id = localStorage.id;
var roomInfo = document.querySelector('#roomInfo');
var roomShowcase = document.querySelector('#roomShowcase');
var info = document.querySelector('#bookingInfo');
var description_area = document.querySelector('#description');
var btn = document.querySelector('#button');
var room;
function showHeader(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var header = document.createElement('h1');
            header.textContent = room[0].name;
            roomShowcase.appendChild(header);
        })
            .then(function (res) {
            var roomAbout = document.createElement('div');
            roomAbout.id = 'roomAbout';
            roomShowcase.appendChild(roomAbout);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#roomAbout');
            var guestNumber = document.createElement('span');
            guestNumber.textContent = room[0].descriptionShort.GuestMax + ' 人。 ';
            roomAbout.appendChild(guestNumber);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#roomAbout');
            var bedType = document.createElement('span');
            if (room[0].descriptionShort.Bed[0] === 'Single') {
                bedType.textContent = ' 單人床。 ';
            }
            if (room[0].descriptionShort.Bed[0] === 'Small Double') {
                bedType.textContent = ' 小型雙人床。 ';
            }
            if (room[0].descriptionShort.Bed[0] === 'Double') {
                bedType.textContent = ' 雙人床。 ';
            }
            if (room[0].descriptionShort.Bed[0] === 'Queen') {
                bedType.textContent = ' 加大雙人床。 ';
            }
            roomAbout.appendChild(bedType);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#roomAbout');
            var isBreakFast = document.createElement('span');
            if (room[0].amenities.Breakfast === true) {
                isBreakFast.textContent = '附早餐 。 ';
            }
            else {
                isBreakFast.textContent = '不附早餐 。';
            }
            roomAbout.appendChild(isBreakFast);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#roomAbout');
            var bathNumber = document.createElement('span');
            if (Object.values(room[0].descriptionShort)[3] === 1) {
                bathNumber.textContent = '衛浴 1 間 。 ';
            }
            if (Object.values(room[0].descriptionShort)[3] === 2) {
                bathNumber.textContent = '衛浴 2 間 。 ';
            }
            roomAbout.appendChild(bathNumber);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#roomAbout');
            var footage = document.createElement('span');
            footage.textContent = room[0].descriptionShort.Footage + ' 平方公尺';
            roomAbout.appendChild(footage);
        });
    }
    catch (error) {
        console.log(error);
    }
}
function bookingInfo(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var price = document.createElement('p');
            price.textContent = "\u5E73\u65E5 (\u4E00\u81F3\u56DB) \u50F9\u683C: ".concat(room[0].normalDayPrice, " / \u5047\u65E5 (\u4E94\u81F3\u65E5) \u50F9\u683C: ").concat(room[0].holidayPrice);
            info.appendChild(price);
        })
            .then(function (res) {
            var checkDate = document.createElement('p');
            checkDate.textContent = "\u5165\u4F4F\u6642\u9593: ".concat(room[0].checkInAndOut.checkInEarly, " (\u6700\u65E9) / ").concat(room[0].checkInAndOut.checkInLate, " (\u6700\u665A)");
            info.appendChild(checkDate);
        })
            .then(function (res) {
            var checkOut = document.createElement('p');
            checkOut.textContent = '退房時間: ' + room[0].checkInAndOut.checkOut;
            info.appendChild(checkOut);
        });
    }
    catch (error) {
        console.log(error);
    }
}
function description(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var ul = document.querySelector('#describes');
            var article = room[0].description;
            var newArr = article.split('.');
            for (var key in newArr) {
                if (newArr[key].length > 0) {
                    var item = document.createElement('li');
                    item.textContent = "- ".concat(newArr[key]);
                    ul.append(item);
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
function setting(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var setting = document.querySelector('#setting');
            for (var _i = 0, _a = Object.entries(room[0].amenities); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var createDiv = document.createElement('div');
                var icon = document.createElement('span');
                icon.classList.add('material-icons');
                icon.classList.add('md-48');
                if (value === true) {
                    if (key === 'Air-Conditioner') {
                        icon.textContent = 'air';
                        createDiv.textContent = '空調';
                    }
                    else if (key === 'Breakfast') {
                        icon.textContent = 'restaurant';
                        createDiv.textContent = '早餐';
                    }
                    else if (key === 'Child-Friendly') {
                        icon.textContent = 'escalator_warning';
                        createDiv.textContent = '適合兒童';
                    }
                    else if (key === 'Great-View') {
                        icon.textContent = 'landscape';
                        createDiv.textContent = '景緻美麗';
                    }
                    else if (key === 'Mini-Bar') {
                        icon.textContent = 'local_bar';
                        createDiv.textContent = '小酒吧';
                    }
                    else if (key === 'Pet-Friendly') {
                        icon.textContent = 'pets';
                        createDiv.textContent = '寵物友善';
                    }
                    else if (key === 'Refrigerator') {
                        icon.textContent = 'kitchen';
                        createDiv.textContent = '冰箱';
                    }
                    else if (key === 'Room-Service') {
                        icon.textContent = 'call';
                        createDiv.textContent = '客房服務';
                    }
                    else if (key === 'Smoke-Free') {
                        icon.textContent = 'smoke_free';
                        createDiv.textContent = '禁菸';
                    }
                    else if (key === 'Sofa') {
                        icon.textContent = 'chair';
                        createDiv.textContent = '沙發';
                    }
                    else if (key === 'Television') {
                        icon.textContent = 'tv';
                        createDiv.textContent = '電視';
                    }
                    else if (key === 'Wi-Fi') {
                        icon.textContent = 'wifi';
                        createDiv.textContent = '無線網路';
                    }
                }
                createDiv.prepend(icon);
                createDiv.classList.add('d-flex');
                createDiv.classList.add('flex-column');
                createDiv.classList.add('justify-center');
                createDiv.classList.add('align-center');
                if (createDiv.textContent.length > 0) {
                    setting.appendChild(createDiv);
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
function showPhoto(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var aside = document.querySelector('aside');
            aside.style.backgroundImage = "url(".concat(room[0].imageUrl[0], ")");
        });
    }
    catch (error) {
        console.log(error);
    }
}
function showPrice(url) {
    if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
    try {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + web_token
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            room = res.room.map(function (data) {
                return data;
            });
        })
            .then(function (res) {
            var area = document.querySelector('.around');
            var price = document.createElement('p');
            var priceSpan = document.createElement('span');
            var date = new Date().getDay();
            if (date === 1 || date === 2 || date === 3 || date === 4) {
                priceSpan.textContent = '$ ' + room[0].normalDayPrice;
            }
            else {
                priceSpan.textContent = '$ ' + room[0].holidayPrice;
            }
            priceSpan.classList.add('text-big');
            var one = document.createElement('span');
            one.textContent = ' / 1晚';
            price.appendChild(priceSpan);
            price.appendChild(one);
            area.prepend(price);
        });
    }
    catch (error) {
        console.log(error);
    }
}
function createBtn() {
    for (var i = 0; i < 3; i++) {
        var btn_1 = document.createElement('button');
        btn_1.classList.add('showcase-btn');
        btn_1.classList.add('bg-none');
        btn_1.id = "".concat(i);
        button.append(btn_1);
    }
}
showHeader();
showPrice();
bookingInfo();
description();
setting();
showPhoto();
createBtn();
