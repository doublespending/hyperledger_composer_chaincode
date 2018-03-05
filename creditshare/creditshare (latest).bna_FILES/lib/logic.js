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
}

transaction SetCredit {
  //create your SetSensorTemp transaction model
  --> User target
  o String instrument
  o String credit
}

 */

function sumStrings(a,b){
    var res='', c=0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c){
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c>9;
    }
    return res.replace(/^0+/,'');
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
    if(setCredit.target.baiduOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.baiduCredit);
    if(setCredit.target.alibabaOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.alibabaCredit);
    if(setCredit.target.tengxunOk) setCredit.target.sum = sumStrings(setCredit.target.sum, setCredit.target.tengxunCredit);
  
    // renew 
    return getAssetRegistry('org.acme.sample.User')
      .then(function (assetRegistry) {
          return assetRegistry.update(setCredit.target);
    });

}

