 document.addEventListener('DOMContentLoaded',()=>{

    const canvas=document.querySelector('canvas')
    canvas.width=500
    canvas.height=400

    let isDrawing=false 
    const ctx=canvas.getContext('2d')
   
    const getCanvasPoint=(clientX,clientY)=>{
        const rect=canvas.getBoundingClientRect()
        return {
            x:clientX-rect.left,
            y:clientY-rect.top
        }
    }
    const handleMouseDown=(e)=>{
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchStart(x,y)
    }
    const handleMouseMove=(e)=>{
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchMove(x,y)
    }
    const handleMouseUp=(e)=>{
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchEnd(x,y)
    }

    const handleTouchStart=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchStart(x,y)
    }
    const handleTouchMove=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchMove(x,y)
    }
    const handleTouchEnd=(e)=>{
        const clientX=e.changedTouches[0].clientX
        const clientY=e.changedTouches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchEnd(x,y)
    }
    const onTouchStart=(x,y)=>{
        isDrawing=true
        ctx.beginPath()
        ctx.strokeStyle="blue"
        ctx.moveTo(x,y)

    }
    const onTouchMove=(x,y)=>{
       if(!isDrawing)return 
        ctx.lineTo(x,y)
        ctx.stroke()
    }
    const onTouchEnd=(x,y)=>{
        isDrawing=false 
    }
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
 })