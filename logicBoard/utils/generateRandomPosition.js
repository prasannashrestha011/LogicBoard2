const generateRandomPosition = () => {
    const positionX = Math.floor(Math.random() * deviceWidth +60);  // Random X position within the canvas width
    const positionY = Math.floor(Math.random() * deviceHeight +100); // Random Y position within the canvas height
    return { x: positionX, y: positionY };
}
