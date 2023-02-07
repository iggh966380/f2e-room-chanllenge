export function addSliderButton() {
    var button = document.querySelector("#button");
    for (var i = 0; i < 4; i++) {
        var btn_1 = document.createElement("button");
        btn_1.classList.add("showcase-btn");
        btn_1.classList.add("bg-none");
        btn_1.id = "".concat(i);
        button.append(btn_1);
    }
    var btn = document.querySelectorAll(".showcase-btn");
    var bg = document.querySelector("#bg");
    btn.forEach(function (item) {
        item.addEventListener("click", function () {
            item.classList.add("bg-full");
            for (var i = 0; i < btn.length; i++) {
                if (btn[i].id !== item.id) {
                    if (btn[i].classList.contains("bg-full")) {
                        btn[i].classList.remove("bg-full");
                    }
                }
            }
            bg.style.backgroundImage = "url(./img/house/bg".concat(item.id, ".jpeg)");
        });
    });
}
