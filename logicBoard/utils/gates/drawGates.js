 function DrawAndGate(gate){

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
    ctx.lineTo(gate.position.x,gate.position.y-15)

    ctx.moveTo(gate.inputs[1].position.x,gate.inputs[1].position.y)
    ctx.lineTo(gate.position.x,gate.position.y+15)

   //vertical line
    ctx.moveTo(gate.position.x, gate.position.y - 15); 
    ctx.lineTo(gate.position.x, gate.position.y + 15);


    ctx.stroke()
   // Set the fill style
    ctx.strokeStyle = "black";

// Begin path for the AND gate
    ctx.beginPath();
    
    ctx.moveTo(gate.position.x +15, gate.position.y -25);
    ctx.lineTo(gate.position.x+15 ,gate.position.y+gate.height);
    ctx.quadraticCurveTo(gate.position.x+gate.width,gate.position.y,gate.position.x+15,gate.position.y-gate.height)
    ctx.closePath();
    ctx.fill()
    ctx.stroke();
    fillGateColor(gate)

    //for end line
    ctx.beginPath()
    ctx.moveTo(gate.position.x+69,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()

}
 function DrawORgate(gate){
    ctx.lineWidth=3
    ctx.beginPath()
  
    ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
    ctx.lineTo(gate.position.x,gate.position.y-15)
    ctx.moveTo(gate.inputs[1].position.x,gate.inputs[1].position.y)
    ctx.lineTo(gate.position.x,gate.position.y+15)

    //vertical line
    ctx.moveTo(gate.position.x,gate.position.y-15)
    ctx.lineTo(gate.position.x,gate.position.y+15)
    ctx.stroke()
    
    ctx.beginPath();
    
    ctx.moveTo(gate.position.x+4,gate.position.y-gate.height)
    ctx.quadraticCurveTo(gate.position.x+35,gate.position.y,gate.position.x+4,gate.position.y+gate.height)
 
    ctx.quadraticCurveTo(gate.position.x+gate.width,gate.position.y,gate.position.x+4,gate.position.y-gate.height)
    
    ctx.stroke(); // Draws the outline
    fillGateColor(gate)
    //for end line
    ctx.beginPath()
    ctx.moveTo(gate.position.x+60,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()
    ctx.fill()
}
 function DrawNotGate(gate){

    ctx.lineWidth = 2;
    ctx.beginPath();
 
    ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
    ctx.lineTo(gate.position.x,gate.position.y)
    ctx.stroke()

    ctx.beginPath();
    
    ctx.fillStyle="blue"
    ctx.moveTo(gate.position.x+4,gate.position.y-15)
    ctx.lineTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.position.x+4,gate.position.y+15)

    ctx.stroke(); 
    fillGateColor(gate)
    DrawNod(gate)

    //for end line 
    ctx.beginPath()
    ctx.moveTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()
}

 function DrawNanDGate(gate){
    DrawAndGate(gate)
    fillGateColor(gate)
        DrawNod(gate)
      
}
 function DrawNorGate(gate){
    DrawORgate(gate)
    fillGateColor(gate)
    DrawNod(gate)

   
}

 function DrawXorGate(gate){
  
        const intersectingLength=5

        ctx.lineWidth = 2;
       DrawORgate(gate)
       fillGateColor(gate)
        //for second line
        ctx.beginPath()
        ctx.moveTo(gate.position.x,gate.position.y-gate.height+5)
        ctx.quadraticCurveTo(gate.position.x+20,gate.position.y,gate.position.x,gate.position.y+gate.height-5)
        ctx.stroke()

       

    
    
    
}
function DrawNod(gate){
  
    ctx.beginPath()
    ctx.fillStyle="black"
    ctx.arc(gate.output.position.x-22,gate.output.position.y,4,0,Math.PI*2)
    ctx.fill()
}

function fillGateColor(gate){
    const gradient = ctx.createLinearGradient(
        gate.position.x, 
        gate.position.y, 
        gate.position.x + gate.width, 
        gate.position.y
    );
    gradient.addColorStop(0,"#34715C")
    gradient.addColorStop(1,"#F9FAFF")
    ctx.fillStyle = gradient;
    ctx.fill()
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.stroke();
}
