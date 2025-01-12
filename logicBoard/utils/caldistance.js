function calDistance(port, point) {
    const dx = point.x - port.position.x;
    const dy = point.y - port.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}