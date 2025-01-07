let counter=0
let width=60
let height=50
const Xoffset=40
const Yoffset=15
const outputOffset=30

//@@ for not gate offset
const notXoffset=30

const portTemplate={
    id:"",
    position:{x:0,y:0},
    value:false ,
    radius:8,
    type:""
}
const gateTemplate={
    id:"",
    type:null,
    width,
    height,
    position:{x:0,y:0},
    inputs:[portTemplate],
    output:{...portTemplate}
}
function gateCreator(type,position){
    const id=counter++
    if(type=="not"){
        const newGate={
            ...gateTemplate,
            id:`gate-${counter++}`,
            type,
            position,
            inputs:[
                {
                    id:`input-port-${id}`,
                   ...portTemplate,
                   position:{x:position.x-notXoffset,y:position.y},
                   type:"gate-input",
                 
                }
              
            ],
            output:{
                ...portTemplate,
                id:`output-port-${id}`,
                type:"gate-output",
                position:{x:position.x+notXoffset*2,y:position.y},
            }
         }
         gates.push(newGate)
         return
    }
     const newGate={
        ...gateTemplate,
        id:`gate-${counter++}`,
        type,
        position,
        inputs:[
            {
               ...portTemplate,
               id:`input-port-${id}`,
               position:{x:position.x-Xoffset,y:position.y-Yoffset},
               type:"gate-input",
             
            },
            {
                ...portTemplate,
                id:`input-port-${id+1}`,
                position:{x:position.x-Xoffset,y:position.y+Yoffset},
                type:"gate-input"
             }
        ],
        output:{
            ...portTemplate,
            id:`output-port-${id}`,
            type:"gate-output",
            position:{x:position.x+outputOffset*2,y:position.y},
        }
     }
     console.log("new gate",newGate)
     gates.push(newGate)
 
}
function updateGatePosition(gate,newPosition){
    const updatedInputPorts=gate.inputs.map((port,idx)=>({
        ...port,
        position:{
            x:gate.type=="not"?newPosition.x-notXoffset:newPosition.x-Xoffset,
            y:gate.type=="not"?newPosition.y:(
                idx==0?newPosition.y-Yoffset:newPosition.y+Yoffset
            )
        }
    }))
    const updatedOutputPort={
        ...gate.output,
        position:{
            x:newPosition.x+outputOffset*2,
            y:newPosition.y
        }
    }
    const updatedGate={
        ...gate,
        position:newPosition,
        inputs:updatedInputPorts,
        output:updatedOutputPort
    }
    return updatedGate
}
