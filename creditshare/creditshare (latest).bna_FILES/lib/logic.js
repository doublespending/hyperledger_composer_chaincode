/**
asset User identified by userID {
  //create your Team asset model
  o String userID
  o String pubKey
  
  o String baiduCredit
  o boolean baiduOk
  
  o String alibabaCredit
  o boolean alibabaOk
  
  o String tengxunCredit
  o boolean tengxunOk
  
  o Integer num
  o String sum
  o String nsquare
}

transaction SetCredit {
  //create your SetSensorTemp transaction model
  --> User target
  o String instrument
  o String credit
}

 */

// Paillier Alogrithm: http://blog.csdn.net/jason_cuijiahui/article/details/79121702
// npm install big-integer

// Decrypted(a, n)+Decrypted(b, n) == Decrypted(sumString(a, b, n))
function sumStrings(a, b, n){
    var len = a.length
    var numA = bigInt(a, 16);
    var numB = bigInt(b, 16); 
    var nsquare = bigInt(n, 16);
    var preResult = numA.add(numB);
    
    var numsResult = preResult.divmod(nsquare);
    var numResult = numResult['remainder'];
    var result = numResult.toString(16);

    while(result.length < len){
      result = '0'+result;
    }

    return result;
}




function onSetCredit(setCredit) {
    if(setCredit.instrument=="baidu"){
        if(!setCredit.target.baiduOk){
            setCredit.target.num++;
            setCredit.target.baiduOk = true;
        }
        setCredit.target.baiduCredit = setCredit.credit;
    }
    else if(setCredit.instrument=="alibaba"){
        if(!setCredit.target.alibabaOk){
            setCredit.target.num++;
            setCredit.target.alibabaOk = true;
        }
        setCredit.target.alibabaCredit = setCredit.credit;
    }
    else if(setCredit.instrument=="tengxun"){
        if(!setCredit.target.tengxun){
            setCredit.target.num++;
            setCredit.target.tengxunOk = true;
        }
        setCredit.target.tengxunCredit = setCredit.credit;      
    }
    else{
        throw new Error("No this instrument: " + setCredit.instrument);
    }
    
    setCredit.target.sum = '0';
    nsquare = setCredit.target.nsquare;
    if(setCredit.target.baiduOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.baiduCredit, nsquare);
    if(setCredit.target.alibabaOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.alibabaCredit, nsquare);
    if(setCredit.target.tengxunOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.tengxunCredit, nsquare);
  
    // renew 
    return getAssetRegistry('org.acme.sample.User')
      .then(function (assetRegistry) {
          return assetRegistry.update(setCredit.target);
    });

}

