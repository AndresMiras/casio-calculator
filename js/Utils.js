
function resolveOperInArray(arr, oper) {
    let arrResult = [];
    while (arr.length > 0) {
        let elmAft = arr[1];

        if(elmAft == mul && oper == mul) {
            let piv = arr.splice(0, 3);
            let multi = piv[0] * piv[2];
            arrResult.push(multi);

        } else if (elmAft == div && oper == div) {
            let piv = arr.splice(0, 3);
            if(piv[2] == 0) {
                return Infinity;
            }
            let divi = piv[0] / piv[2];
            arrResult.push(divi);

        } else if (oper == sum && arr.length > 1) {
            while( arr.length > 0 ) {
                arrResult += arr.splice(0,1)[0];
                arrResult = parseInt(arrResult);
            }
        } else {
            arrResult.push(arr.splice(0, 1)[0]);
        }
    }

    return arrResult;
}

