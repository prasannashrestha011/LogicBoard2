const calculateOutput = (gateType, inputs) => {
    const inputValues = inputs.map(port => port.value);
    console.log("Your input values ",inputValues)
    console.log("your gate types ",gateType)
    switch (gateType) {
      case 'and':
        return inputValues.every(Boolean);
    
      case 'or':
        if (inputValues[0] != null && inputValues[1] != null) {
          console.log("OR gate inputs:", inputValues);
          return inputValues[0] || inputValues[1];
        }
        return null
      
       case 'not':
        if(inputValues[0]!=null){
          console.log("not condition")
          console.log(!inputValues)
          return !inputValues[0]
        } 
      case 'nand':
        if(inputValues[0]!=null && inputValues[1]!==null){
          return !(inputValues[0] && inputValues[1])
        }
      case 'nor':
        if(inputValues[0]!=null && inputValues[1]!==null){
          return !(inputValues[0] || inputValues[1])
      }
      case 'xor':
        if(inputValues[0]!=null && inputValues[1]!==null){
          return (inputValues[0] && !inputValues[1]) || (!inputValues[0] && inputValues[1])

        }
      default:
        return null;
    }
  };