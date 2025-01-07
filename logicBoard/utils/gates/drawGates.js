 function DrawAndGate(gate){
    ctx.fillStyle = 'blue'; 
    ctx.lineWidth = 2;
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
    ctx.fillStyle = "blue";

// Begin path for the AND gate
    ctx.beginPath();
    ctx.moveTo(gate.position.x + 2, gate.position.y - 18);
    ctx.lineTo(gate.position.x + 2, gate.position.y + 17.3);
    ctx.arc(gate.position.x + 17, gate.position.y, 17, Math.PI / 2, (3 * Math.PI) / 2, true);
    ctx.closePath();
    ctx.fill();

    //for end line
    ctx.beginPath()
    ctx.moveTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()

}
 function DrawORgate(gate){
    ctx.lineWidth=2
    ctx.beginPath()
    ctx.fillStyle="blue"
    ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
    ctx.lineTo(gate.position.x,gate.position.y-15)
    ctx.moveTo(gate.inputs[1].position.x,gate.inputs[1].position.y)
    ctx.lineTo(gate.position.x,gate.position.y+15)

    //vertical line
    ctx.moveTo(gate.position.x,gate.position.y-15)
    ctx.lineTo(gate.position.x,gate.position.y+15)
    ctx.stroke()
    
    ctx.beginPath();
    ctx.fillStyle="blue"
    ctx.moveTo(gate.position.x+4,gate.position.y-15)
    ctx.lineTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.position.x+4,gate.position.y+15)
    ctx.fill()
    ctx.stroke(); // Draws the outline
    
    //for end line
    ctx.beginPath()
    ctx.moveTo(gate.position.x+34,gate.position.y)
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
    ctx.fill()
    ctx.stroke(); 

    (gate)

    //for end line 
    ctx.beginPath()
    ctx.moveTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()
}

 function DrawNanDGate(gate){
    ctx.fillStyle = 'blue'; 
    ctx.lineWidth = 2;
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
        ctx.fillStyle = "blue";

        // Begin path for the AND gate
        ctx.beginPath();
        ctx.moveTo(gate.position.x + 2, gate.position.y - 18);
        ctx.lineTo(gate.position.x + 2, gate.position.y + 17.3);
        ctx.arc(gate.position.x + 17, gate.position.y, 17, Math.PI / 2, (3 * Math.PI) / 2, true);
        ctx.closePath();
        ctx.fill();

        DrawNod(gate)
        //for end line
        ctx.beginPath()
        ctx.moveTo(gate.position.x+34,gate.position.y)
        ctx.lineTo(gate.output.position.x,gate.output.position.y)
        ctx.stroke()
}
 function DrawNorGate(gate){
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
    ctx.lineTo(gate.position.x,gate.position.y-15)
    ctx.stroke()


    ctx.beginPath()
    ctx.moveTo(gate.inputs[1].position.x,gate.inputs[1].position.y)
    ctx.lineTo(gate.position.x,gate.position.y+15)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(gate.position.x,gate.position.y-15)
    ctx.lineTo(gate.position.x,gate.position.y+15)
    ctx.stroke()
    ctx.beginPath();
    ctx.fillStyle="blue"
    ctx.moveTo(gate.position.x+4,gate.position.y-15)
    ctx.lineTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.position.x+4,gate.position.y+15)
    ctx.fill()
    ctx.stroke(); 

    DrawNod(gate)

    //for end line 
    ctx.beginPath()
    ctx.moveTo(gate.position.x+34,gate.position.y)
    ctx.lineTo(gate.output.position.x,gate.output.position.y)
    ctx.stroke()
}

 function DrawXorGate(gate){
  
        const intersectingLength=5

        ctx.lineWidth = 2;
        //for input port lines
        ctx.beginPath();
        ctx.moveTo(gate.inputs[0].position.x,gate.inputs[0].position.y)
        ctx.lineTo(gate.position.x-intersectingLength,gate.position.y-15)
        ctx.stroke()
    
    
        ctx.beginPath()
        ctx.moveTo(gate.inputs[1].position.x,gate.inputs[1].position.y)
        ctx.lineTo(gate.position.x-intersectingLength,gate.position.y+15)
        ctx.stroke()
    
        ctx.beginPath()
        ctx.moveTo(gate.position.x-intersectingLength,gate.position.y-15)
        ctx.lineTo(gate.position.x-intersectingLength,gate.position.y+15)
        ctx.stroke()


        //for second line
        ctx.beginPath()
        ctx.moveTo(gate.position.x,gate.position.y-15)
        ctx.lineTo(gate.position.x,gate.position.y+15)
        ctx.stroke()

        ctx.beginPath();
        ctx.fillStyle="blue"
        ctx.moveTo(gate.position.x+4,gate.position.y-15)
        ctx.lineTo(gate.position.x+34,gate.position.y)
        ctx.lineTo(gate.position.x+4,gate.position.y+15)
        ctx.fill()
        ctx.stroke(); 
    

    
        //for end line 
        ctx.beginPath()
        ctx.moveTo(gate.position.x+34,gate.position.y)
        ctx.lineTo(gate.output.position.x,gate.output.position.y)
        ctx.stroke()
    
}
function DrawNod(gate){
    console.log("gate form output",gate)
    ctx.beginPath()
    ctx.fillStyle="black"
    ctx.arc(gate.output.position.x-22,gate.output.position.y,4,0,Math.PI*2)
    ctx.fill()
}