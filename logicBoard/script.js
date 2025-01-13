let focusPoint={x:0,y:0}
let scale=1
 let canvas=null
 let ctx=null
 
 let contextMenu=null
 let targetedObject=null

 let gates=[]
 let originalGates=[]
 let ports=[]
 let connections=[]
 let type=""
 
 let selectedGate=null
 let selectedPort=null
 let offsetX = 0;
let offsetY = 0;



 let isDragging=false
 let isDraggingPortNode=false // @@ for dragging the outer area of node only @@
 let wasDragging=false
 let isDrawing=false



 document.addEventListener('DOMContentLoaded',()=>{
   
      canvas=document.querySelector('canvas')
      ctx=canvas.getContext('2d')

       contextMenu=document.getElementById('custom-menu')
      const gateCmd=document.querySelectorAll('.btn')
     contextCmds=document.querySelectorAll(".menu-opt")
    const zoomSlider=document.getElementById('zoom-handler')

  
     
   
     const handleMouseDown = (e) => {
        wasDragging = false;
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
        const worldCoords = toWorldCoords(screenX, screenY, scale);
       
       
        onTouchStart(worldCoords.x, worldCoords.y);

        
    };
    
    const handleMouseMove = (e) => {
        wasDragging = true;
   
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
        const worldCoords = toWorldCoords(screenX, screenY, scale);
        onTouchMove(worldCoords.x, worldCoords.y);
    };
    
    const handleMouseUp = (e) => {
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
        const worldCoords = toWorldCoords(screenX, screenY, scale);
        onTouchEnd(worldCoords.x, worldCoords.y);
    };
    const handleTouchStart=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
      
        onTouchStart(x,y);
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
    const handleClick=(e)=>{
   
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchClick(x,y)
    }
    const handleClickOnCanvasArea=(e)=>{
        e.preventDefault()
        contextMenu.style.display = 'none';
       if(wasDragging) return
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        const worldCoords = toWorldCoords(x, y, scale);
        const point={
            x:worldCoords.x,
            y:worldCoords.y
        }
        togglePortValue(point)
      
    
    }

 
    
    
    gateCmd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          
            type=e.target.id
           
            handleClick(e)
        });
    });
    contextCmds.forEach((option)=>{
        option.addEventListener('click',(e)=>{
            type=e.target.id 
           
            handleContextMenuAction(type.split('-')[1])
        })
    })
  
    
  
  
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)
    canvas.addEventListener('mouseleave',handleMouseUp)
    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    canvas.addEventListener('touchcancel',handleTouchEnd)
    canvas.addEventListener('click',handleClickOnCanvasArea)
    canvas.addEventListener('contextmenu',(e)=>{
        e.preventDefault()
   
        
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.display = 'block';
        handleContextMenu(e)
    })




    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Get mouse position before zoom
        const point = getCanvasPoint(e.clientX, e.clientY);
        const worldPos = toWorldCoords(point.x, point.y);
        
        // Calculate zoom
        const zoomIntensity = 0.1;
        const zoomFactor = e.deltaY < 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);
        scale *= zoomFactor;
        scale = Math.min(Math.max(0.1, scale), 5.5);
        
        // Update zoom slider if it exists
        if (zoomSlider) {
            zoomSlider.value = scale;
        }
        
        // Calculate offset to keep the worldPos at the same screen position
        const newScreenPos = toScreenCoords(worldPos.x, worldPos.y);
        offsetX -= (newScreenPos.x - point.x) / scale;
        offsetY -= (newScreenPos.y - point.y) / scale;
        
        // Update grid if needed
        if (typeof updateGridScale === 'function') {
            updateGridScale(scale);
        }
        
        // Redraw
        DrawGatesAndPort();
    });
    


   




    zoomSlider.addEventListener('input', (e) => {
       
    
        scale = zoomSlider.value; 
        updateGridScale(scale)

        DrawGatesAndPort(); 
    });
    
    function updateGridScale(scale){
        document.documentElement.style.setProperty('--grid-scale',scale);

    }

 })