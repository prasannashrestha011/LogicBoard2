function calDistance(port, point) {
    const dx = point.x - port.position.x;
    const dy = point.y - port.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}
function getDistanceFromLine(x, y, x1, y1, x2, y2) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq === 0 ? -1 : dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;

    return Math.sqrt(dx * dx + dy * dy);
}
function getDistanceToLineSegment(px, py, x1, y1, x2, y2) {
    // Line segment vector
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    // Vector from point to start of segment
    const dpx = px - x1;
    const dpy = py - y1;
    
    // Project point onto line (this gives a scalar factor t)
    const t = ((dpx * dx + dpy * dy) / (dx * dx + dy * dy));
    
    // Clamp t to the segment range [0, 1]
    const tClamped = Math.max(0, Math.min(1, t));
    
    // Find the closest point on the segment
    const closestX = x1 + tClamped * dx;
    const closestY = y1 + tClamped * dy;
    
    // Distance from the point to the closest point on the segment
    const distX = px - closestX;
    const distY = py - closestY;
    
    return Math.sqrt(distX * distX + distY * distY);
}
