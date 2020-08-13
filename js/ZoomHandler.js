var PanZoom = /** @class */ (function () {
    function PanZoom() {
        var _this = this;
        this.posX = 0;
        this.posY = 0;
        this.zoomLvl = 1.0;
        this.targetDiv = undefined;
        this.zoom = function (event) {
            event.preventDefault();
            var scalingAmounts = {
                0: 1,
                1: 20,
                2: 1000,
            };
            var delta = -event.deltaY * 0.0007 * scalingAmounts[event.deltaMode];
            _this.zoomAt(window.innerWidth * 0.45, window.innerHeight * 0.35, 1 + delta);
            _this.setZoom();
        };
        this.zoomAt = function (x, y, amount) {
            var maxZoom = 3;
            var minZoom = 0.2;
            _this.zoomLvl *= amount;
            if (_this.zoomLvl > maxZoom) {
                amount = maxZoom / (_this.zoomLvl / amount);
                _this.zoomLvl = maxZoom;
            }
            if (_this.zoomLvl < minZoom) {
                amount = minZoom / (_this.zoomLvl / amount);
                _this.zoomLvl = minZoom;
            }
            window.DotNet.invokeMethodAsync('Nodexr', 'SetZoom', _this.zoomLvl);
            var dX = (x - _this.posX) * (1 - amount);
            var dY = (y - _this.posY) * (1 - amount);
            _this.posX += dX;
            _this.posY += dY;
        };
        this.startPan = function () {
            window.addEventListener("mousemove", _this.pan);
            window.addEventListener("mouseup", _this.endPan);
        };
        this.endPan = function () {
            window.removeEventListener("mousemove", _this.pan);
            window.removeEventListener("mouseup", _this.endPan);
        };
        this.pan = function (event) {
            event.preventDefault();
            _this.posX += event.movementX;
            _this.posY += event.movementY;
            _this.setZoom();
        };
        this.setZoom = function () {
            if (!_this.targetDiv) {
                _this.targetDiv = document.getElementById("nodegraph");
            }
            _this.targetDiv.style.transform = "translate(" + _this.posX + "px, " + _this.posY + "px) scale(" + _this.zoomLvl + ")";
        };
        this.clientToGraphPos = function (clientX, clientY) {
            if (!_this.targetDiv) {
                _this.targetDiv = document.getElementById("nodegraph");
            }
            var rect = _this.targetDiv.getBoundingClientRect();
            var x = (clientX - rect.left) / _this.zoomLvl;
            var y = (clientY - rect.top) / _this.zoomLvl;
            return [x, y];
        };
    }
    return PanZoom;
}());
window['panzoom'] = new PanZoom();
//# sourceMappingURL=ZoomHandler.js.map