function toScreenCoords(x, y, scale) {
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: (x - canvas.width/2) * scale + canvas.width/2,
        y: (y - canvas.height/2) * scale + canvas.height/2
    };
}

    
function toWorldCoords(screenX, screenY, scale) {
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: (screenX - canvas.width/2) / scale + canvas.width/2,
        y: (screenY - canvas.height/2) / scale + canvas.height/2
    };
}