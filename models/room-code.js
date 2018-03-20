const _ = require('lodash');
/*

check if the new code == to first of ary if yes, +1
*/

var codeArr = [];
var arrLen = codeArr.length;


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