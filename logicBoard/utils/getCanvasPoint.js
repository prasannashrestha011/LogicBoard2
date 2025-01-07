const getCanvasPoint=(clientX,clientY)=>{
    const rect=canvas.getBoundingClientRect()
    const scaleX=canvas.width/rect.width
    const scaleY=canvas.height/rect.height
    return {
        x:(clientX-rect.left)*scaleX,
        y:(clientY-rect.top) *scaleY
    }
}