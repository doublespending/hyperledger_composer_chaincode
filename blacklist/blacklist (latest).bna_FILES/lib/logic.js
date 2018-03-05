function isExit(arr, data){
   for(var i = 0; i < arr.length; i++){
       if(arr[i] == data)
         return true;
   }
   return false;
}

function onWhiteListAppend(listAppend) {
  
   if(listAppend.target.data){
     if(!isExit(listAppend.target.data, listAppend.newElement)){
       listAppend.target.data.push(listAppend.newElement);
     }
   }
   else {
     listAppend.target.data = [listAppend.newElement];
   }
   // renew 
   return getAssetRegistry('org.acme.sample.WhiteList').then(function (assetRegistry) {
       return assetRegistry.update(listAppend.target);
   });
}

function onBlackListAppend(listAppend) {
  
   if(listAppend.target.data){
     if(!isExit(listAppend.target.data, listAppend.newElement)){
       listAppend.target.data.push(listAppend.newElement);
     }
   }
   else {
     listAppend.target.data = [listAppend.newElement];
   }
   // renew 
   return getAssetRegistry('org.acme.sample.BlackList').then(function (assetRegistry) {
       return assetRegistry.update(listAppend.target);
   });
}

 function onListDelete(listDelete){
   var arr = listDelete.target.data;
   var result = [];
   for(var i = 0; i<arr.length; i++){
       if(arr[i] == listDelete.deleteElement)
           continue;
       result.push(arr[i]);
   }
  
   listDelete.target.data = result;
   return getAssetRegistry('org.acme.sample.BlackList').then(function (assetRegistry) {
       return assetRegistry.update(listDelete.target);
   });      
    
 }

/*
function onCreatorUpdateList(creatorUpdateList){
  
   creatorUpdateList.target.data = creatorUpdateList.newList;
   // renew 
   return getAssetRegistry('org.acme.sample.BlackList').then(function (assetRegistry) {
       return assetRegistry.update(creatorUpdateList.target);
   });  
}

function onClear(clear){
   clear.target.data = [];
   return getAssetRegistry('org.acme.sample.BlackList').then(function (assetRegistry) {
       return assetRegistry.update(clear.target);
   });  
}



 function onListDelete(listDelete){
   var arr = listDelete.target.data;
   var result = [];
   for(var i = 0; i<arr.length; i++){
       if(arr[i] == listDelete.deleteElement)
           continue;
       result.push(arr[i]);
   }
  
   listDelete.target.data = result;
   return getAssetRegistry('org.acme.sample.BlackList').then(function (assetRegistry) {
       return assetRegistry.update(listDelete.target);
   });      
    
 }
*/

