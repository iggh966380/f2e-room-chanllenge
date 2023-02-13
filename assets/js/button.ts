import { MouseClickEvent } from "./mouse-event.js";

export function addButton() {
  const container = document.querySelector("#button__container");
  for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    btn.classList.add("slider__button");
    btn.classList.add("bg-none");
    btn.id = `${i}`;
    container.append(btn);
  }
}

export function setButtonAction() {
  const buttons = document.querySelectorAll(".slider__button");
  const bg = document.querySelector("#bg") as HTMLElement;
  buttons.forEach((item: Element) => {
    const result = new MouseClickEvent(item).switchBackground(buttons);
    // console.log(result);
  });
}
