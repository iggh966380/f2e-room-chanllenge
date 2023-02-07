var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EventListener = /** @class */ (function () {
    function EventListener(item) {
        this.item = item;
    }
    EventListener.prototype.eventListener = function (actionType, fn) {
        return this.item.addEventListener(actionType, fn);
    };
    return EventListener;
}());
var MouseEnterEvent = /** @class */ (function (_super) {
    __extends(MouseEnterEvent, _super);
    function MouseEnterEvent(item, text, actionType) {
        var _this = _super.call(this, item) || this;
        _this.text = text;
        _this.actionType = actionType;
        return _this;
    }
    MouseEnterEvent.prototype.mouseEvent = function () {
        var _this = this;
        this.eventListener(this.actionType, function () {
            setTimeout(function () {
                toggleClassList(_this.text, "d-none", "remove");
            }, 600);
            toggleClassList(_this.item, "overlay", "add");
        });
    };
    return MouseEnterEvent;
}(EventListener));
export { MouseEnterEvent };
var MouseLeaveEvent = /** @class */ (function (_super) {
    __extends(MouseLeaveEvent, _super);
    function MouseLeaveEvent(item, text, actionType) {
        var _this = _super.call(this, item) || this;
        _this.text = text;
        _this.actionType = actionType;
        return _this;
    }
    MouseLeaveEvent.prototype.mouseEvent = function () {
        var _this = this;
        this.eventListener(this.actionType, function () {
            toggleClassList(_this.text, "d-none", "add");
            toggleClassList(_this.item, "overlay", "remove");
        });
    };
    return MouseLeaveEvent;
}(EventListener));
export { MouseLeaveEvent };
var MouseClickEvent = /** @class */ (function (_super) {
    __extends(MouseClickEvent, _super);
    function MouseClickEvent(item, room, actionType) {
        var _this = _super.call(this, item) || this;
        _this.actionType = actionType;
        _this.room = room;
        return _this;
    }
    MouseClickEvent.prototype.mouseEvent = function () {
        var _this = this;
        this.eventListener(this.actionType, function () {
            localStorage.id = _this.room.id;
        });
    };
    return MouseClickEvent;
}(EventListener));
export { MouseClickEvent };
function toggleClassList(element, style, actionType) {
    switch (actionType) {
        case "add":
            element.classList.add(style);
            break;
        case "remove":
            element.classList.remove(style);
            break;
    }
}
