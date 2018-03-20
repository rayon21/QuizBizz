String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/*keep counting up if hit 'ZZZZ', then restart*/
var incrementCode = (code) => {
    var i = 3;
    while(i >= 0){
        if(code[i] === 'Z'){
            code = code.replaceAt(i,'a');
            i--;
        }else if(code[i] === 'z'){
            code = code.replaceAt(i,'A');
            break;
        }else{
            var codeNum = code.charCodeAt(i);
            code = code.replaceAt(i, String.fromCharCode(codeNum + 1));
            break;
        }
    }
    return code;
};

var generateCode = (arrLen) => {
    var code = "aaaa";
    var isDuplicate ;

    if(arrLen !== 0){
        code = codeArr[arrLen-1];
        console.log(code);
        do{
            code = incrementCode(code);
            isDuplicate = codeArr.includes(code); //check if code alrdy exist
        }while (isDuplicate === true);
    }
    return code;
};

var addCode = (codeArr) =>{
    var code = generateCode(codeArr.length);
    codeArr.push(code);
};

var deleteCode = (codeArr, codeTodelete) =>{
    var idx = codeArr.indexOf(codeTodelete);
    codeArr.splice(idx, 1);
};


/*demostrate
var codeArr = ["aaaa", "ZZZZ"];
addCode(codeArr);
console.log(codeArr);
deleteCode(codeArr, "aaaa");
console.log(codeArr);*/

module.exports = {
    addCode,
    deleteCode
};

