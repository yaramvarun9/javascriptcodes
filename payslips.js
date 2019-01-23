var AWS=require('aws-sdk');

exports.handler = function(event,context,callback) {

AWS.config.update({
                    //setting the region
  
region: "us-west-1",

});


var docClient = new AWS.DynamoDB.DocumentClient();
               //configuring dynamodb


var params={

 TableName:"CompanyDetails",

FilterExpression: "#c=:lc ",
               //filtering data using formtype and leave type and eid
    
ExpressionAttributeNames: {
 
       "#c": "companyid",
 
     //  "#e":"eid"

    },

    ExpressionAttributeValues: { 
                           //reading data from queryparams or json
         
":lc": event.companyid,
   
 //     ":id":event.eid
 
   },

    ProjectionExpression: 'taxes'


};

docClient.scan(params,function(err,data){

    if(err){  
                                //checking error
        
console.log("error occured");
        
callback(null,err);

    }

    else{

     // callback(null,data.Items[0].taxes.arrears.hra);
 
   // callback(null,data.Items[0].taxes);   

    var k=data.Items.length;

    var arr=[],arr1=[];
 
    for(var i=0;i<k;i++){
  
       var l=data.Items[i].taxes.earnings;
   
      for(var m=0;m<8;m++){
  
           var keys=Object.keys(l);
 
       //    console.log(keys[m]);

            var h=event.salary*data.Items[i].taxes.earnings.keys[m]/100;
    
         arr.push(keys[m]);
  
           arr1.push(h);
  
   }

     }

     callback(null,l);
 
       
};

});

};