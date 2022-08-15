const sum = document.getElementById('suma').value;
const res = document.getElementById('menos').value;
const div = document.getElementById('divide').value;
const mul = document.getElementById('multi').value;

let separateNumbers = (str) => {
    let formatedStr = [];

    for (let i = 0, j = 0; i < str.length; i++) {
        let elm = str[i];
        let elmBef = str[i - 1];
        if(isNaN(elmBef) && !isNaN(elm) || isNaN(elm)){
            formatedStr.push(elm);
            j++;
        } else if (!isNaN(elmBef) && !isNaN(elm)){
            formatedStr[j - 1] = (formatedStr[j - 1] + elm);
        }
    }

    return formatedStr;
}


let isErrorCalc = (arr = []) => {
    let flat = false;

    for (let i = 0; i < arr.length && flat == false; i++) {
        let elm = arr[i];
        let elmAft = arr[i + 1];
        let elmBfr = arr[i - 1];
        if(elm == div && elmAft == mul || elm == mul && elmAft == div
        || elm == mul && elmAft == mul || elm == div && elmAft == div
        || elm == sum && elmAft == mul || elm == mul && elmAft == sum
        || elm == res && elmAft == mul || elm == mul && elmAft == res
        || elm == sum && elmAft == div || elm == div && elmAft == sum
        || elm == res && elmAft == div || elm == div && elmAft == res
        || elm == div && isNaN(elmAft) || elm == mul && isNaN(elmAft)
        || isNaN(elm) && elmAft == div || isNaN(elm) && elmAft == mul
        || elmBfr == undefined && elm == div || elmBfr == undefined && elm == mul ){
            flat = true;
        }
    }

    return flat;
}


let formatSymbols = (arr) => { //Rehacer con Splice
    //Busca los simbolos de resta y suma que están permitidos y los formatea para dejar un solo 
    let arrFmt = [];
   
    while(arr.length > 0) {
        let elm = arr[0];
        let elmAft = arr[1];
        if(elmAft == sum && elm == sum || 
           elmAft == res && elm == res) {
            arr.splice(0, 2);
            arrFmt.push(sum);
        } else if(elmAft == res && elm == sum || 
                  elmAft == sum && elm == res) {
            arr.splice(0, 2);
            arrFmt.push(res);
        } else {
            arrFmt.push(arr.splice(0, 1)[0]);
        }
    }
    
    arr = arrFmt.map(elmt => elmt);
    console.log(arrFmt);
    arrFmt = [];
    
    //Unimos los Symbols '+' y '-' al number que esté a la izquierda, ya que así podemos darle el valor.

    while(arr.length > 0) { 
        let elm = arr[0];
        let elmAft = arr[1];

        if((elm == res || elm == sum) && !isNaN(elmAft)) {
            arrFmt.push(elm + '' + elmAft);
            arr.splice(0, 2);
        } else {
            arrFmt.push(arr.splice(0, 1)[0]);
        }
    }

    console.log(arrFmt);
    return arrFmt;
}

let resolveCalc = (arr) => {
    let result = arr.map(elmt => isNaN(elmt) ? elmt : parseInt(elmt));
    let arrResult = [];
    
    //Multiplicación
    arrResult = resolveOperInArray(result, mul);
    
    //División
    result = resolveOperInArray(arrResult, div);
    console.log(result);

    //Suma & Resta
    if(result != Infinity) {
        arrResult = resolveOperInArray(result, sum);
        result = parseInt(arrResult);
    }
    
 
    return result;
}

let addToScreen = (variable) => {
    if(document.getElementById('screen').value != 'E' 
     && document.getElementById('screen').value != Infinity){
        document.getElementById('screen').value += variable;
    } 
}

let clearScreen = () => {
    document.getElementById('screen').value = '';
}

let calculate = () => {
    let result = '';
    //Se obtiene la cadena.
    let operation = document.getElementById('screen').value;

    //Se depura el string, separando los número de los símbolos.
    operation = separateNumbers(operation);

    //Se formatean los símbolos + y - .
    operation = formatSymbols(operation);

    //Se analiza si la operación está mal escrita y finalmente se calcula.
    result = isErrorCalc(operation) ? 'E' : resolveCalc(operation);
    document.getElementById('screen').value = result;
}

