function reverseString(str){
    console.log("Original String:", str);
    const splitStr= str.split('');
    console.log("After Split:", splitStr);

    const reverseStr= splitStr.reverse();
    console.log("After Reverse:", reverseStr);
    
    const finalStr= reverseStr.join('')

    console.log('Reverse String:- ', finalStr);
    // return finalStr;
    
}

reverseString('javaScript')