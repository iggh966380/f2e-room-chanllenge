var btnForBg = document.querySelectorAll('.showcase-btn');
var imageUrl = [];
function changePhoto(url) {
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
            imageUrl = room[0].imageUrl.map(function (data) {
                return data;
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
btnForBg.forEach(function (item) {
    item.addEventListener('click', function () {
        item.classList.add('bg-full');
        var aside = document.querySelector('aside');
        aside.style.backgroundImage = "url(".concat(imageUrl[item.id], ")");
        for (var i = 0; i < btnForBg.length; i++) {
            if (btnForBg[i].id !== item.id) {
                if (btnForBg[i].classList.contains('bg-full')) {
                    btnForBg[i].classList.remove('bg-full');
                }
            }
        }
    });
});
changePhoto();
