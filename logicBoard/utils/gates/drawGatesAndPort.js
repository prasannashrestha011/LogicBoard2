function DrawGatesAndPort(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width/2, -canvas.height/2);
  
    gates.map(gate=>{
        gate.inputs.map(port=>{
            ctx.beginPath()
            ctx.fillStyle=port.value?"red":"black"
            ctx.arc(port.position.x,port.position.y,port.radius,0,Math.PI*2)
            ctx.fill()
        })
        //@@ for output port 
        ctx.beginPath()
        ctx.fillStyle=gate.output.value?"red":"black"
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
        ctx.strokeStyle="black"
        ctx.moveTo(conn.start.position.x,conn.start.position.y)
   
        ctx.lineTo(conn.end.position.x,conn.end.position.y)
        ctx.stroke()
     
       
    })
    ports.map(port=>{
        const rectX=port.position.x-port.width/2
        const rectY=port.position.y-port.height/2
        
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(rectX, rectY, port.width, port.height);
        ctx.stroke();

        ctx.beginPath()
        ctx.fillStyle=port.value?"red":"black"
        ctx.arc(port.position.x,port.position.y,port.radius,0,Math.PI*2)
        ctx.fill()
    })
    ctx.restore()
}