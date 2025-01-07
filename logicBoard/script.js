 let canvas=null
 let ctx=null
 document.addEventListener('DOMContentLoaded',()=>{

      canvas=document.querySelector('canvas')
    const gateCmd=document.querySelectorAll('.btn')


     ctx=canvas.getContext('2d')
   
   
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
      
    }
    const onTouchMove = (x, y) => {
       
       
    };
    const onTouchEnd=(x,y)=>{
       
    }
   

  
   
    
    gateCmd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.id);
           
           
        });
    });
    
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
 

 })