const generateRandomPosition = () => {
    const positionX = Math.floor(Math.random() * (500 - 60) + 60);  // Random X position between 60 and 500
    const positionY = Math.floor(Math.random() * (400 - 100) + 100); // Random Y position between 100 and 400
    return { x: positionX, y: positionY };
}