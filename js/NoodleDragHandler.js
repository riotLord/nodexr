var NoodleDragHandler = /** @class */ (function () {
    function NoodleDragHandler() {
        var _this = this;
        this.noodleElement = null;
        this.isValid = false;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.startNoodleDrag = function (startX, startY) {
            _this.noodleElement = document.getElementById("tempNoodle");
            _this.startX = _this.endX = startX;
            _this.startY = _this.endY = startY;
            window.addEventListener("dragover", _this.dragNoodle);
            _this.updatePath();
            _this.setInvalid();
        };
        this.dragNoodle = function (event) {
            var _a;
            _a = window['panzoom'].clientToGraphPos(event.clientX, event.clientY), _this.endX = _a[0], _this.endY = _a[1];
            _this.updatePath();
        };
        this.endDrag = function () {
            window.removeEventListener("dragover", _this.dragNoodle);
        };
        this.updatePath = function () {
            if (_this.noodleElement != null) {
                _this.setPath(_this.startX, _this.startY, _this.endX, _this.endY);
            }
        };
        this.setPath = function (startX, startY, endX, endY) {
            var path = NoodleDragHandler.getNoodlePath(startX, startY, endX, endY);
            if (_this.noodleElement != null) {
                _this.noodleElement.setAttribute("d", path);
            }
        };
        this.setValid = function () {
            if (!_this.isValid) {
                _this.isValid = true;
                if (_this.noodleElement != null) {
                    _this.noodleElement.classList.remove("noodle-invalid");
                }
            }
        };
        this.setInvalid = function () {
            _this.isValid = false;
            if (_this.noodleElement != null) {
                _this.noodleElement.classList.add("noodle-invalid");
            }
        };
        this.clearDragImage = function (event) {
            var img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='; //A transparent image
            event.dataTransfer.setDragImage(img, 0, 0);
        };
    }
    NoodleDragHandler.getNoodlePath = function (startX, startY, endX, endY) {
        var ctrlLength = (5 + 0.4 * Math.abs(endX - startX) + Math.min(0.2 * Math.abs(endY - startY), 40));
        var result = "M " + startX + " " + startY + " C " + (startX + ctrlLength) + " " + startY + " " + (endX - ctrlLength) + " " + endY + " " + endX + " " + endY;
        return result;
    };
    return NoodleDragHandler;
}());
window['tempNoodle'] = new NoodleDragHandler();
//# sourceMappingURL=NoodleDragHandler.js.map