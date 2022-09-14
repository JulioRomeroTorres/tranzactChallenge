var dateBirth    = document.getElementById("myDatebirth");

const stateElement = document.getElementById("stateElement");
const planElement  = document.getElementById("planElement"); 

const periodElement = document.getElementById("periodSelector");
const ageElement = document.getElementById("ageElement");           
const carrierOp1 = document.getElementById("carrierOp1");
const carrierOp2 = document.getElementById("carrierOp2");
const premiumOp1 = document.getElementById("premiumOp1");
const premiumOp2 = document.getElementById("premiumOp2");
const annualOp1 = document.getElementById("annualOp1");
const annualOp2 = document.getElementById("annualOp2");
const buttonPremium = document.getElementById("buttonPremium");

const carrierCont = document.getElementById("carrierCont");
const premiumCont = document.getElementById("premiumCont");
const annualCont  = document.getElementById("annualCont");
const mounthCont  = document.getElementById("mounthCont");

var requestData ={
    ageCalendar:     0,
    stateInput:      0,
    planInput:       0,
    periodInput:     0,
    ageInput:        0,
    mounthCalendar : 0
};

var responseData = [];

const getAge = (myBirthdate)=>{
    
    ageMounth = []

    const todayDate      = new Date();
    const currentlyYear  = parseInt(todayDate.getFullYear());
    const currentlyMonth = parseInt(todayDate.getMonth())+1;
    const currentlyDay   = parseInt(todayDate.getDay());

    const birthYear      = parseInt(myBirthdate.substring(0,4));
    const birthMounth    = parseInt(myBirthdate.substring(5,7));
    const birthDay       = parseInt(myBirthdate.substring(8,10));

    let age = currentlyYear - birthYear;
    if( currentlyMonth < birthMounth ){
        age--;
    }
    else if(currentlyMonth ===  birthMounth && currentlyDay < birthDay){
        age--;
    }

    ageMounth[0] = birthMounth;
    ageMounth[1] = age;

    return ageMounth;
    
};

const validData = (Data)=>{
    const myList = Object.values(Data);
    
    for(let i = 0; i < myList.length; i++ ){
        if( myList[i] === 0  ) return false;
    }

    return true;
}

async function getPremium(e){

    if( !validData(requestData)  ) alert('Complete the information')
    else{
        if( requestData.ageCalendar !== requestData.ageInput) 
            alert('La Edada No es la adecuada')
        else{

            // Get petition

            e.preventDefault();

            // Connection to Backend Server
            
            const backendUrl = 'http://localhost:3000/plans?' + 
                                new URLSearchParams({
                                    plan: requestData.planInput,
                                    age: requestData.ageCalendar,
                                    state:requestData.stateInput,
                                    datebirth: requestData.mounthCalendar,
                                });
            const res = await fetch(backendUrl,
                {
                    method:'GET'
                });
            console.log('Connect to server', res);
            const data = await res.json();
            console.log('Data from MySQl',data)
            
            responseData = data;

        }
    }

};


buttonPremium.addEventListener("click", getPremium);

dateBirth.addEventListener("change",function(){
    
    if(this.value){
        
        myAge = getAge(this.value);
        
        requestData.ageCalendar    =  myAge[1];
        requestData.mounthCalendar =  myAge[0];
        console.log(`My age is : ${myAge[1]} years old`);
        console.log('requestData Arr: ',requestData);   
    }

});

stateElement.addEventListener("change",function(){
            requestData.stateInput  =  this.value;
            console.log('state ', requestData.stateInput);
            console.log('requestData Arr: ',requestData);
});


planElement.addEventListener("change",function(){
    requestData.planInput = this.value;
    console.log('plan ', requestData.planInput);
    console.log('requestData Arr: ',requestData);
});

periodElement.addEventListener("change",function(){

    while (carrierCont.firstChild) {
        carrierCont.removeChild(carrierCont.lastChild);
    }

    while (premiumCont.firstChild) {
        premiumCont.removeChild(premiumCont.lastChild);
    }

    requestData.periodInput = this.value;

    let periodInput = this.value;
    let mountlyVal, annualVal;

    for(let i=0; i < responseData.length; i++){
        if(data[i].carrier) carrierOp1.value = data[i].carrier;
        if(data[i].carrier) carrierOp2.value = data[i].carrier;
        if(data[i].carrier) annualOp1.value = data[i].premium;
        if(data[i].carrier) annualOp2.value = data[i].premium;
    }


    switch(periodInput){
        case 'Quartely':
            for(let i = 0; i < responseData.length ; i++){
                mountlyVal = responseData[i].premium/3.0;
                annualVal = responseData[i].premium*4.0;
                let div = document.createElement("div")
                div.innerHTML = `<input type="number" id="premiumOp1"></input>`;
                carrierCont.appendChild(div);
                
            }
            break;
        case 'Mounthly':
            for(let i = 0; i < responseData.length ; i++){
                mountlyVal = responseData[0].premium;
                annualVal = responseData[0].premium*12.0;
                
            }
            break;
        case 'Semi-Annual':
            for(let i = 0; i < responseData.length ; i++){
                mountlyVal = responseData[0].premium/6.0;
                annualVal = responseData[0].premium*2.0;
                
            }
            
            break;
        default:
            for(let i = 0; i < responseData.length ; i++){
                mountlyVal = responseData[0].premium/12.0;
                annualVal = responseData[0].premium;
                
            }
            break;
    }

    console.log('period ', requestData.periodInput);
    console.log('requestData Arr: ',requestData);
});


ageElement.addEventListener("change",function(){

    requestData.ageInput = parseInt(this.value);
    //if( requestData[0] !== requestData[4] ) alert('Age is unconsist');
    console.log('Age',requestData.ageInput);   
    console.log('reques arr', requestData);
});
