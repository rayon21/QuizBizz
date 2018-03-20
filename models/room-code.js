const _ = require('lodash');
/*

check if the new code == to first of ary if yes, +1
*/

var codeArr = [];
var arrLen = codeArr.length;

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

var generateCode = () => {
    var code = "aaaa";
    var isDuplicate ;

    if(arrLen !== 0){
        code = codeArr[arrLen-1];
        do{
            incrementCode(code);
            isDuplicate = codeArr.includes(code); //check if code alrdy exist
        }while (isDuplicate === true);
    }
    return code;
};