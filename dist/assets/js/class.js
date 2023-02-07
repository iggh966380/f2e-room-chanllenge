var AddClass = /** @class */ (function () {
    function AddClass(element, classList) {
        this.classList = classList;
        this.element = element;
    }
    AddClass.prototype.addClass = function () {
        for (var i = 0; i < this.classList.length; i++) {
            this.element.classList.add(this.classList[i]);
        }
    };
    return AddClass;
}());
export { AddClass };
