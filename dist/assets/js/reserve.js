var localCheckIn;
var localCheckOut;
var closeBtn = document.querySelector('.close');
var closeSuccessBtn = document.querySelector('.closeSuccessModal');
var modal = document.querySelector('#myModal');
var successModal = document.querySelector('#successModal');
var reserveModal = document.querySelector('.booking-now');
reserveModal.addEventListener('click', function () {
    localCheckIn = localStorage.getItem('checkInTime');
    localCheckOut = localStorage.getItem('checkOutTime');
    if (!localCheckOut) {
        alert('請先選擇入住與退房日期');
    }
    else {
        modal.classList.remove('d-none');
        reserve();
    }
});
closeBtn.addEventListener('click', function () {
    modal.classList.add('d-none');
});
closeSuccessBtn.addEventListener('click', function () {
    successModal.classList.add('d-none');
    window.location.reload();
});
function reserve() {
    var checkInDate = document.querySelector('#checkInDate');
    var checkOutDate = document.querySelector('#checkOutDate');
    checkInDate.value = localCheckIn;
    checkOutDate.value = localCheckOut;
    var reserveNight = [];
    var checkInArr = localCheckIn.split('-').map(function (data) {
        return parseInt(data, 10);
    });
    var checkOutArr = localCheckOut.split('-').map(function (data) {
        return parseInt(data, 10);
    });
    var timeFormat = {
        year: Number,
        month: Number,
        date: Number
    };
    function isLeap(year, month, arr1, arr2) {
        if ((year % 4) === 0 && (year % 100) !== 0) {
            return arr1[month];
        }
        else if (year % 400 === 0) {
            return arr1[month];
        }
        else {
            return arr2[month];
        }
    }
    var monthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var daysInThisMonth = isLeap(checkInArr[0], checkInArr[1] - 1, monthLeap, monthNormal);
    var daysInNextMonth = isLeap(checkInArr[0], checkInArr[1], monthLeap, monthNormal);
    if (checkInArr[0] === checkOutArr[0] && checkInArr[1] === checkOutArr[1] && checkInArr[2] !== checkOutArr[2]) {
        for (var i = checkInArr[2]; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkInArr[0],
                month: checkInArr[1],
                date: i
            };
            reserveNight.push(timeFormat);
        }
    }
    else if (checkInArr[0] === checkOutArr[0] && checkInArr[1] !== checkOutArr[1]) {
        var count = 0;
        for (var i = checkInArr[2]; i <= daysInThisMonth; i++) {
            timeFormat = {
                year: checkInArr[0],
                month: checkInArr[1],
                date: i
            };
            count += 1;
            reserveNight.push(timeFormat);
        }
        if (checkOutArr[1] - checkInArr[1] > 1) {
            for (var i = 1; i <= daysInNextMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1] + 1,
                    date: i
                };
                count += 1;
                reserveNight.push(timeFormat);
            }
        }
        for (var i = 1; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkOutArr[0],
                month: checkOutArr[1],
                date: i
            };
            count += 1;
            reserveNight.push(timeFormat);
        }
    }
    else if (checkInArr[0] !== checkOutArr[0]) {
        var count = 0;
        console.log(checkInArr[1]);
        if (12 - checkInArr[1] > 0) {
            for (var i = checkInArr[2]; i <= daysInThisMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1],
                    date: i
                };
                count += 1;
                reserveNight.push(timeFormat);
            }
            for (var i = 1; i <= daysInNextMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1] + 1,
                    date: i
                };
                count += 1;
                reserveNight.push(timeFormat);
            }
        }
        else if (12 - checkInArr[1] === 0) {
            for (var i = checkInArr[2]; i <= daysInThisMonth; i++) {
                timeFormat = {
                    year: checkInArr[0],
                    month: checkInArr[1],
                    date: i
                };
                count += 1;
                reserveNight.push(timeFormat);
            }
        }
        for (var i = 1; i < checkOutArr[2]; i++) {
            timeFormat = {
                year: checkOutArr[0],
                month: checkOutArr[1],
                date: i
            };
            count += 1;
            reserveNight.push(timeFormat);
        }
    }
    console.log(reserveNight);
    var daysReserved = document.querySelector('#DaysReserved');
    daysReserved.textContent = "".concat(reserveNight.length, " \u665A");
    function showPrice(url) {
        if (url === void 0) { url = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id); }
        var price;
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + web_token
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                price = res.room.map(function (data) {
                    return data;
                });
            })
                .then(function (res) { return console.log(price[0].normalDayPrice); })
                .then(function (res) { return console.log(price[0].holidayPrice); })
                .then(function (res) {
                var totalPrice = 0;
                for (var key in reserveNight) {
                    var day = new Date(reserveNight[key].year, reserveNight[key].month, reserveNight[key].date).getDay();
                    if (day === 6 || day === 0) {
                        totalPrice += price[0].holidayPrice;
                    }
                    else {
                        totalPrice += price[0].normalDayPrice;
                    }
                }
                console.log(totalPrice);
                var totalPriceShow = document.querySelector('#totalPrice');
                totalPriceShow.textContent = "$ ".concat(totalPrice);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    showPrice();
    var submitBtn = document.querySelector('#submitBtn');
    var inputName = document.querySelector('#input-name');
    var inputTel = document.querySelector('#input-phone');
    var newArr = [];
    for (var key in reserveNight) {
        if (reserveNight[key].month < 10 && reserveNight[key].date < 10) {
            newArr.push("".concat(reserveNight[key].year, "-0").concat(reserveNight[key].month, "-0").concat(reserveNight[key].date));
        }
        else if (reserveNight[key].month < 10) {
            newArr.push("".concat(reserveNight[key].year, "-0").concat(reserveNight[key].month, "-").concat(reserveNight[key].date));
        }
        else if (reserveNight[key].date < 10) {
            newArr.push("".concat(reserveNight[key].year, "-").concat(reserveNight[key].month, "-0").concat(reserveNight[key].date));
        }
        else {
            newArr.push("".concat(reserveNight[key].year, "-").concat(reserveNight[key].month, "-").concat(reserveNight[key].date));
        }
    }
    console.log(newArr);
    submitBtn.addEventListener('click', submitPost);
    function submitPost() {
        var data = {
            name: inputName.value,
            tel: inputTel.value,
            date: newArr
        };
        console.log(data);
        try {
            fetch("https://challenge.thef2e.com/api/thef2e2019/stage6/room/".concat(id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + web_token
                },
                body: JSON.stringify(data)
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                var myModal = document.querySelector('#myModal');
                myModal.classList.add('d-none');
            })
                .then(function (res) {
                var successModal = document.querySelector('#successModal');
                successModal.classList.remove('d-none');
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
