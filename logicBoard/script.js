 document.addEventListener('DOMContentLoaded',()=>{

    const canvas=document.querySelector('canvas')
    const gateCmd=document.querySelectorAll('.btn')


    let deviceWidth=null
    let deviceHeight=null
    const handleWindowResize=()=>{
    deviceWidth=window.innerWidth *0.9 
     deviceHeight=window.innerHeight *0.8
    canvas.width=deviceWidth
    canvas.height=deviceHeight
    }
    handleWindowResize()
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
   

    const drawRectange=(label)=>{
        const {x,y}=generateRandomPosition()
        ctx.beginPath()
        ctx.fillStyle="blue"
        ctx.rect(x,y,60,50)
        ctx.fill()

        ctx.fillStyle="white"
        ctx.textAlign="center"
        ctx.font="17px Arial"
        ctx.fillText(label,x+30,y+25)
      
     
    }
    const generateRandomPosition = () => {
        const positionX = Math.floor(Math.random() * deviceWidth);  // Random X position within the canvas width
        const positionY = Math.floor(Math.random() * deviceHeight); // Random Y position within the canvas height
        return { x: positionX, y: positionY };
    };
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    window.addEventListener('resize', handleWindowResize);

    gateCmd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.id);
            drawRectange(e.target.id)
        });
    });
 })