function toScreenCoords(x, y) {
    return {
        x: (x + offsetX - canvas.width/2) * scale + canvas.width/2,
        y: (y + offsetY - canvas.height/2) * scale + canvas.height/2
    };
}


    
function toWorldCoords(x, y) {
    return {
        x: (x - canvas.width/2) / scale + canvas.width/2 - offsetX,
        y: (y - canvas.height/2) / scale + canvas.height/2 - offsetY
    };
}
