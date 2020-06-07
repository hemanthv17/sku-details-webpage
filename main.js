function determineWeightOrPrice(unit){
    if(unit == "Price"){
        createForm("Enter the price ::");
    }else{
       createForm("Enter the Weight ::");
    }
   }
   
   function createForm(textToBeDisplayed){
       const form=document.createElement('form');
       form.setAttribute("id", "myForm");
       const text=document.createTextNode(textToBeDisplayed);
       const lineBreak=document.createElement('br');
       document.body.appendChild(lineBreak);
       document.body.appendChild(text);
       document.body.appendChild(form);
       const input=document.createElement("input");
       input.setAttribute("type","text");
       document.getElementById("myForm").appendChild(input);   
   }

   function makeApiCall(){
    const unitValue = document.getElementById('unitvalue').value;
    const unitName = document.getElementById('unitname').value;
    const skuName=document.getElementById('skuname').value;
    var apiCall=new XMLHttpRequest();
    apiCall.onreadystatechange = function (){
        if(this.readyState ==4 && this.status == 200){
            generateResponse(unitName, this.responseText);
            console.log(JSON.stringify(JSON.parse(this.responseText)));
        }
    }
    if(unitName == 'Price'){
        const url= 'http://skuinformationservice-env.eba-dpsj8wzk.us-east-2.elasticbeanstalk.com/GetSkuWeight?skuName='+skuName+'&skuPrice='+unitValue;
        apiCall.open("GET", url,true)
    } else {
        const url = 'http://skuinformationservice-env.eba-dpsj8wzk.us-east-2.elasticbeanstalk.com/GetSkuPrice?skuName='+skuName+'&skuWeightInGrams='+unitValue;
    apiCall.open("GET", url,true);
    }
    apiCall.setRequestHeader("Content-type", "application/json");
    apiCall.send();
    }

    function generateResponse(unitName, responseFromApi){
        const name=             document.createTextNode("Name of the Item  :: "+JSON.parse(responseFromApi).skuname);
        if(unitName == 'Price'){
        var finalWeightOrPrice= document.createTextNode("Weight To Be Sold :: "+JSON.parse(responseFromApi).finalskuweight+JSON.parse(responseFromApi).finalskuweightunit);
        } else {
        var finalWeightOrPrice= document.createTextNode("Price of the Item :: "+JSON.parse(responseFromApi).finalskuprice + ' Rupees');
        }
        const pricePerKilo=     document.createTextNode("Price Per KG      :: "+JSON.parse(responseFromApi).skuprice + ' Rupees');
        const lineBreak = document.createElement('br');
        const lineBreak2 = document.createElement('br');

        document.getElementById('response').innerHTML='\n';
        document.getElementById('response').appendChild(finalWeightOrPrice);
        document.getElementById('response').append(lineBreak);
        document.getElementById('response').appendChild(name);
        document.getElementById('response').append(lineBreak2);
        document.getElementById('response').appendChild(pricePerKilo);







    }

   