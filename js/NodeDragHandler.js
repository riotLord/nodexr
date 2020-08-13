var NodeDragHandler = /** @class */ (function () {
    function NodeDragHandler() {
        this.startNodeDrag = function () {
            //console.log("starting node drag");
            document.addEventListener('mousemove', window['NodeDragHandler'].dragNode);
            document.addEventListener('mouseup', function () {
                return document.removeEventListener('mousemove', window['NodeDragHandler'].dragNode);
            });
        };
        this.dragNode = function (event) {
            window['DotNetNodeDragService'].invokeMethodAsync("DragNode", event.clientX, event.clientY);
        };
    }
    return NodeDragHandler;
}());
window["NodeDragHandler"] = new NodeDragHandler();
//# sourceMappingURL=NodeDragHandler.js.map