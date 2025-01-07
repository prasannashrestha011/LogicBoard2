let counter=0
let width=60
let height=50
const Xoffset=40
const Yoffset=15
const outputOffset=30
const portTemplate={
    id:`port-${counter++}`,
    position:{x:0,y:0},
    value:false ,
    radius:8,
    type:""
}
const gateTemplate={
    id:`gate-${counter++}`,
    type:null,
    width,
    height,
    position:{x:0,y:0},
    inputs:[portTemplate],
    output:{...portTemplate}
}
function gateCreator(type,position){
     const newGate={
        ...gateTemplate,
        type,
        position,
        inputs:[
            {
               ...portTemplate,
               position:{x:position.x-Xoffset,y:position.y-Yoffset},
               type:"gate-input",
             
            },
            {
                ...portTemplate,
                position:{x:position.x-Xoffset,y:position.y+Yoffset},
                type:"gate-input"
             }
        ],
        output:{
            ...portTemplate,
            type:"gate-output",
            position:{x:position.x+outputOffset*2,y:position.y},
        }
     }
     gates.push(newGate)
     console.log(gates)
}
