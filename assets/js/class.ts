export class AddClass {
  private classList: string[];
  private element: HTMLElement;
  constructor(element: HTMLElement, classList: string[]) {
    this.classList = classList;
    this.element = element;
  }

  public addClass() {
    for (let i = 0; i < this.classList.length; i++) {
      this.element.classList.add(this.classList[i]);
    }
  }
}
