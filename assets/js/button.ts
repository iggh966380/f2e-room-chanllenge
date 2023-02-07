export function addSliderButton() {
  const button = document.querySelector("#button");
  for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    btn.classList.add("showcase-btn");
    btn.classList.add("bg-none");
    btn.id = `${i}`;
    button.append(btn);
  }

  const btn = document.querySelectorAll(".showcase-btn");
  const bg = document.querySelector("#bg") as HTMLElement;
  btn.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.add("bg-full");
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].id !== item.id) {
          if (btn[i].classList.contains("bg-full")) {
            btn[i].classList.remove("bg-full");
          }
        }
      }
      bg.style.backgroundImage = `url(./img/house/bg${item.id}.jpeg)`;
    });
  });
}
