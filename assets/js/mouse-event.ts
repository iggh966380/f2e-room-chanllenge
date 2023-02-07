import { Room } from "../interface/room";

interface VoidFunction {
  (): void;
}

class EventListener {
  item: HTMLAnchorElement;
  constructor(item: HTMLAnchorElement) {
    this.item = item;
  }

  eventListener(
    actionType: "mouseenter" | "mouseleave" | "click",
    fn: VoidFunction
  ): void {
    return this.item.addEventListener(actionType, fn);
  }
}

export class MouseEnterEvent extends EventListener {
  item: HTMLAnchorElement;
  text: HTMLSpanElement;
  actionType: "mouseenter";
  constructor(
    item: HTMLAnchorElement,
    text: HTMLSpanElement,
    actionType: "mouseenter"
  ) {
    super(item);
    this.text = text;
    this.actionType = actionType;
  }

  public mouseEvent() {
    this.eventListener(this.actionType, () => {
      setTimeout(() => {
        toggleClassList(this.text, "d-none", "remove");
      }, 600);
      toggleClassList(this.item, "overlay", "add");
    });
  }
}

export class MouseLeaveEvent extends EventListener {
  item: HTMLAnchorElement;
  text: HTMLSpanElement;
  actionType: "mouseleave";
  constructor(
    item: HTMLAnchorElement,
    text: HTMLSpanElement,
    actionType: "mouseleave"
  ) {
    super(item);
    this.text = text;
    this.actionType = actionType;
  }

  public mouseEvent() {
    this.eventListener(this.actionType, () => {
      toggleClassList(this.text, "d-none", "add");
      toggleClassList(this.item, "overlay", "remove");
    });
  }
}

export class MouseClickEvent extends EventListener {
  item: HTMLAnchorElement;
  actionType: "click";
  room: Room;
  constructor(item: HTMLAnchorElement, room: Room, actionType: "click") {
    super(item);
    this.actionType = actionType;
    this.room = room;
  }

  public mouseEvent() {
    this.eventListener(this.actionType, () => {
      localStorage.id = this.room.id;
    });
  }
}

function toggleClassList(
  element: HTMLElement,
  style: string,
  actionType: "remove" | "add"
) {
  switch (actionType) {
    case "add":
      element.classList.add(style);
      break;
    case "remove":
      element.classList.remove(style);
      break;
  }
}
