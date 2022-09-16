var element=creatediv('div','container-fluid');
var row1=creatediv('div','row');
var row2=creatediv('div','row result');

var nav=creatediv('nav','navbar navbar-expand-lg');
nav.innerHTML="Human Names With Country Probability";

var input=document.createElement('input');
input.setAttribute('id','input');
input.setAttribute('type','search');
input.setAttribute('placeholder','Search...');

var button=document.createElement('button');
button.setAttribute('id','button');
button.setAttribute('onclick','displaydata()');
button.innerHTML="Submit";

row1.append(input,button);



element.append(nav,row1,row2);
document.body.append(element);

function creatediv(elemen,classname){
    var divele=document.createElement(elemen);
    divele.setAttribute('class',classname);
    return divele;
}

async function displaydata(){
    row2.innerHTML=" ";
    var name=document.getElementById('input').value;
    try {
        var res=await fetch(`https://api.nationalize.io/?name=${name}`);
        var result=await res.json();

        var card=creatediv('div','col-6-sm card text-white');
        var cardhead=creatediv('div','card-header');
        cardhead.innerHTML=`Country_Id: ${result.country[0].country_id}`;
        var cardbody=creatediv('div','card-body');
        var cardtitle=creatediv('h4','card-title');
        cardtitle.innerHTML=`Name: ${name}`;
        var cardtext=creatediv('h4','card-title');
        cardtext.innerHTML=`Probability: ${result.country[0].probability}`;

        cardbody.append(cardtitle,cardtext);
        card.append(cardhead,cardbody);
        


        var card1=creatediv('div','col-6-sm card text-white');
        var cardhead1=creatediv('div','card-header');
        cardhead1.innerHTML=`Country_Id: ${result.country[1].country_id}`; 
        var cardbody1=creatediv('div','card-body');
        var cardtitle1=creatediv('h4','card-title');
        cardtitle1.innerHTML=`Name: ${name}`;
        var cardtext1=creatediv('h4','card-title');
        cardtext1.innerHTML=`Probability: ${result.country[1].probability}`;

        cardbody1.append(cardtitle1,cardtext1);
        card1.append(cardhead1,cardbody1);
        row2.append(card,card1);

        console.log(result.country[0].country_id);
        console.log(result.country[0].probability);
        console.log(result.country[1].country_id);
        console.log(result.country[1].probability);
        
    } catch (error) {
        row2.innerHTML="Please Enter The Valid Name!...";
        row2.setAttribute('style','color:red;text-align:center; font-size:50px')
    }
    
}