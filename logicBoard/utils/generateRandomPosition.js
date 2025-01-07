const generateRandomPosition = () => {
    const positionX = Math.floor(Math.random() * deviceWidth);  // Random X position within the canvas width
    const positionY = Math.floor(Math.random() * deviceHeight); // Random Y position within the canvas height
    return { x: positionX, y: positionY };
}
