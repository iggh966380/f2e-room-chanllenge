var roomDemo = document.querySelector('#roomDemo');
var bookKnow = document.querySelector('#bookKnow');
function showModal(url) {
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
            header.classList.add('mb-10');
            roomDemo.appendChild(header);
        })
            .then(function (res) {
            var hr = document.createElement('hr');
            hr.classList.add('mb-10');
            roomDemo.appendChild(hr);
        })
            .then(function (res) {
            var roomAbout = document.createElement('div');
            roomAbout.id = 'modalAbout';
            roomAbout.classList.add('mb-10');
            roomDemo.appendChild(roomAbout);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#modalAbout');
            var guestNumber = document.createElement('span');
            guestNumber.textContent = room[0].descriptionShort.GuestMax + ' 人。 ';
            roomAbout.appendChild(guestNumber);
        })
            .then(function (res) {
            var roomAbout = document.querySelector('#modalAbout');
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
            var roomAbout = document.querySelector('#modalAbout');
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
            var roomAbout = document.querySelector('#modalAbout');
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
            var roomAbout = document.querySelector('#modalAbout');
            var footage = document.createElement('span');
            footage.textContent = room[0].descriptionShort.Footage + ' 平方公尺';
            roomAbout.appendChild(footage);
        })
            .then(function (res) {
            var price = document.createElement('p');
            price.textContent = "\u5E73\u65E5 (\u4E00\u81F3\u56DB) \u50F9\u683C: ".concat(room[0].normalDayPrice, " / \u5047\u65E5 (\u4E94\u81F3\u65E5) \u50F9\u683C: ").concat(room[0].holidayPrice);
            price.classList.add('mb-10');
            roomDemo.appendChild(price);
        })
            .then(function (res) {
            var settingModal = document.createElement('div');
            for (var _i = 0, _a = Object.entries(room[0].amenities); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var createDiv = document.createElement('div');
                var icon = document.createElement('span');
                icon.classList.add('material-icons');
                icon.classList.add('md-24');
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
                    settingModal.appendChild(createDiv);
                }
                settingModal.classList.add('d-flex');
                settingModal.classList.add('flex-around');
                settingModal.classList.add('mb-20');
                roomDemo.appendChild(settingModal);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
function bookInfo(url) {
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
            var bookInfo = document.createElement('h1');
            bookInfo.textContent = '入住資訊';
            bookInfo.classList.add('mb-10');
            bookKnow.appendChild(bookInfo);
        })
            .then(function (res) {
            var hr = document.createElement('hr');
            hr.classList.add('mb-10');
            bookKnow.appendChild(hr);
        })
            .then(function (res) {
            var checkDate = document.createElement('p');
            checkDate.textContent = "- \u5165\u4F4F\u6642\u9593: ".concat(room[0].checkInAndOut.checkInEarly, " (\u6700\u65E9) / ").concat(room[0].checkInAndOut.checkInLate, " (\u6700\u665A) \u9000\u623F\u6642\u9593: ").concat(room[0].checkInAndOut.checkOut, "\u3002\u8ACB\u81EA\u884C\u78BA\u8A8D\u884C\u7A0B\u5B89\u6392\u3002");
            checkDate.classList.add('mb-10');
            bookKnow.appendChild(checkDate);
        })
            .then(function (res) {
            var def = document.createElement('p');
            def.textContent = "- \u5E73\u65E5\u5B9A\u7FA9\u9031\u4E00\u81F3\u9031\u56DB ; \u5047\u65E5\u5B9A\u7FA9\u9031\u4E94\u53CA\u9031\u65E5\u53CA\u570B\u5B9A\u5047\u65E5\u3002";
            def.classList.add('mb-10');
            bookKnow.appendChild(def);
        })
            .then(function (res) {
            var assign = document.createElement('p');
            assign.textContent = "- \u5948\u65AF\u65C5\u9928\u5168\u9762\u7981\u6B62\u5438\u83F8\u3002";
            assign.classList.add('mb-10');
            bookKnow.appendChild(assign);
        })
            .then(function (res) {
            var problem = document.createElement('p');
            problem.textContent = "- \u82E5\u60A8\u6709\u4EFB\u4F55\u554F\u984C\uFF0C\u8ACB\u64A5\u625302-33456789 (\u670D\u52D9\u6642\u9593: \u9031\u4E00\u81F3\u9031\u516D10:00 ~ 18:00)\u3002";
            problem.classList.add('mb-20');
            bookKnow.appendChild(problem);
        });
    }
    catch (error) {
        console.log(error);
    }
}
bookInfo();
showModal();
