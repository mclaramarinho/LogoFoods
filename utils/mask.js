export default function applyMask(){
    const allMaskedInputs = document.querySelectorAll(".masked");

    allMaskedInputs.forEach(el => {
        el.addEventListener("keyup", ev => {
            const mask = el.getAttribute("mask");
            const value = el.value;

            if(ev.key!=="Backspace"){
                const newValue = maskValue(mask, value);
                
                el.value = newValue;
                el.setAttribute('value', newValue);
            }

        })
    })
}

export function maskValue(mask, value){
    // 9 = decimal
    // A = uppercase letter
    // a = lowercase letter
    // / \ ! @ # $ % & ( ) - = + 

    const maskLength = mask.length;
    const prevValue = value.substring(0, value.length-1);
    
    if(value.length > maskLength){
        return prevValue;
    }
    
    const [maskArr, valueArr] = [Array.from(mask), Array.from(value)];

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/;

    const decimalRegex = /[0-9]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    let maskedValue = "";

    let prevWasSpecial = false;

    maskArr.forEach((c, i) => {
        if(prevWasSpecial && valueArr[i] === undefined && valueArr[i-1]!==undefined){
            maskedValue += valueArr[i-1];
            return maskedValue;
        }else if(valueArr[i] === undefined){
            return maskedValue;
        }

        if(specialCharacterRegex.test(c)){
            maskedValue += c;
            prevWasSpecial = true;
        }else{
            if(c === "9"){
                const match = decimalRegex.test(valueArr[i]);
                if(match){
                    maskedValue+=valueArr[i];
                }
            }else if(c === "A"){
                const match = uppercaseRegex.test(valueArr[i]);
                if(match){
                    maskedValue+=valueArr[i];
                }
            }else if(c === "a"){
                const match = lowercaseRegex.test(valueArr[i]);
                if(match){
                    maskedValue+=valueArr[i];
                }
            }
            prevWasSpecial = false;

        }
    })

    return maskedValue;
    
}