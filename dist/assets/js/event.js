var btn2 = document.querySelectorAll('.showcase-btn');
var bg = document.querySelector('#bg');
btn2.forEach(function (item) {
    item.addEventListener('click', function () {
        item.classList.add('bg-full');
        for (var i = 0; i < btn2.length; i++) {
            if (btn2[i].id !== item.id) {
                if (btn2[i].classList.contains('bg-full')) {
                    btn2[i].classList.remove('bg-full');
                }
            }
        }
        bg.style.backgroundImage = "url(./img/house/bg".concat(item.id, ".jpeg)");
    });
});
