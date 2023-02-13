import { Room } from "../interface/room";
import {
  MouseEnterEvent,
  MouseLeaveEvent,
  MouseClickEvent,
} from "./mouse-event.js";
import { fetchRooms } from "../service/rooms.service.js";
import { AddClass } from "./class.js";
import { addButton, setButtonAction } from "./button.js";

async function init() {
  const imgArea = document.querySelector("#photo");
  const rooms = await fetchRooms();

  rooms.forEach((item: Room, index: number) => {
    let link = document.createElement("a");
    const linkClasses = ["showcase-img", "bg-center"];
    new AddClass(link, linkClasses).addClass();

    let text = document.createElement("span");
    const textClasses = ["d-none"];
    new AddClass(text, textClasses).addClass();

    link.href = `./booking.html`;
    link.style.backgroundImage = `url(${rooms[index].imageUrl})`;

    text.textContent = `${rooms[index].name}`;

    imgArea.append(link);
    link.append(text);

    const mouseEvent = [
      new MouseEnterEvent(link, text, "mouseenter"),
      new MouseLeaveEvent(link, text, "mouseleave"),
    ];

    for (let i = 0; i < mouseEvent.length; i++) {
      mouseEvent[i].mouseEvent();
    }

    new MouseClickEvent(link).mouseEvent(item);
  });

  addButton();
  setButtonAction();
}

init();
