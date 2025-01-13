function DrawGatesAndPort(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width/2 +offsetX, -canvas.height/2 + offsetY);
    
  
  
    
    gates.map(gate=>{
        gate.inputs.map(port=>{
            ctx.beginPath()
            ctx.fillStyle=port.value?"#80461B":"#28282B"
            ctx.arc(port.position.x,port.position.y,port.radius,0,Math.PI*2)
            ctx.fill()
        })
        //@@ for output port 
        ctx.beginPath()
        ctx.fillStyle=gate.output.value?"#80461B":"#28282B"
        ctx.arc(gate.output.position.x,gate.output.position.y,gate.output.radius,0,Math.PI*2)
        ctx.fill()
        if(gate.type=="and"){
            DrawAndGate(gate)
        }
        if(gate.type=="or"){
            DrawORgate(gate)
        }
        if(gate.type=="not"){
            DrawNotGate(gate)
        }
        if(gate.type=="nand"){
            DrawNanDGate(gate)
        }
        if(gate.type=="nor"){
            DrawNorGate(gate)
        }
        if(gate.type=="xor"){
            DrawXorGate(gate)
        }
       
    })

    connections.map(conn=>{
        ctx.beginPath()
        ctx.lineWidth=5
        ctx.strokeStyle="black"
        ctx.moveTo(conn.start.position.x,conn.start.position.y)
   
  
        ctx.quadraticCurveTo(conn.start.position.x+80,conn.start.position.y-50,conn.end.position.x,conn.end.position.y)
        ctx.stroke()
     
       
    })
    ports.map(port=>{

        //this x offset is used to for rectangle positioning where 
        //using port position
        const XOFFSET=42
        const rectX=(port.position.x-port.width/2-XOFFSET)
        const rectY=port.position.y-port.height/2
        ctx.lineWidth=2
      
        roundRect(ctx,rectX,rectY,port.width,port.height,5)
    

        const subRectWidth = port.width / 2;
        const subRectHeight = port.height / 2;
        const subRectX = rectX + (port.width - subRectWidth) / 2;
        const subRectY = rectY + (port.height - subRectHeight) / 2;
    
        roundRect(ctx, subRectX, subRectY, subRectWidth, subRectHeight, 12);

        ctx.beginPath();
        ctx.fillStyle="red"
        ctx.arc(port.value?subRectX+subRectWidth*0.8:subRectX+subRectWidth*0.24,subRectY+subRectHeight/2,8,0,Math.PI*2)
        ctx.fill()
        
        ctx.beginPath()
         ctx.fillStyle=port.value?"red":"black"
        ctx.arc(port.position.x,port.position.y,port.radius,0,Math.PI*2)
        ctx.fill()
    })
    ctx.restore()
}