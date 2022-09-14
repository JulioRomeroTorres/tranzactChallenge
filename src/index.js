var dateBirth    = document.getElementById("myDatebirth");

const stateElement = document.getElementById("stateElement");
const planElement  = document.getElementById("planElement"); 

const periodElement = document.getElementById("periodSelector");
const ageElement = document.getElementById("ageElement");           
const buttonPremium = document.getElementById("buttonPremium");

const carrierCont = document.getElementById("carrierCont");
const premiumCont = document.getElementById("premiumCont");
const annualCont  = document.getElementById("annualCont");
const mounthCont  = document.getElementById("mounthCont");

var requestData ={
    ageCalendar:     0,
    stateInput:      0,
    planInput:       0,
    ageInput:        0,
    mounthCalendar : 0
};

var responseData = [];
var countElement = 0;

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

    

    if( !validData(requestData) ) alert('Complete the information, please')
    else{
        if( requestData.ageCalendar !== requestData.ageInput) 
            alert('There is a problem with age')
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

            const data = await res.json();
            console.log('Data from MySQl',data)
            
            responseData = data;
            
            if(responseData.length < 1){
                document.getElementById("periodSelector").disabled = true;
                alert('Query not founded')
            }
            else{
                alert('Query founded')
                document.getElementById("periodSelector").disabled = false;
            }  

        }
    }

};


buttonPremium.addEventListener("click", getPremium);

dateBirth.addEventListener("change",function(){
    
    if(this.value){
        
        myAge = getAge(this.value);
        
        requestData.ageCalendar    =  myAge[1];
        requestData.mounthCalendar =  myAge[0];
        console.log('requestData Arr: ',requestData);   
    }

    ageElement.value     = myAge[1];
    requestData.ageInput = myAge[1]; 
});

stateElement.addEventListener("change",function(){
    requestData.stateInput  =  this.value;
    console.log('requestData Arr: ',requestData);
});


planElement.addEventListener("change",function(){
    requestData.planInput = this.value;
    console.log('requestData Arr: ',requestData);
});

periodElement.addEventListener("change",function(){

    while (carrierCont.firstChild) {
        console.log('Raaaa 1')
        carrierCont.removeChild(carrierCont.lastChild);
    }

    while (premiumCont.firstChild) {
        console.log('Raaaa 2')
        premiumCont.removeChild(premiumCont.lastChild);
    }

    while (annualCont.firstChild) {
        console.log('Raaaa 3')
        annualCont.removeChild(annualCont.lastChild);
    }

    while (mounthCont.firstChild) {
        console.log('Raaaa 4')
        mounthCont.removeChild(mounthCont.lastChild);
    }


    let periodInput = this.value;
    let mounthValue, annualValue;

    for(let i = 0; i < responseData.length; i++){

        switch(periodInput){
            case 'Quartely':
                mounthValue  = responseData[i].premium/3.0;
                annualValue = responseData[i].premium*4.0;
                break;
            case 'Monthly':
                mounthValue  = responseData[i].premium;
                annualValue = responseData[i].premium*12.0;
                break;
            case 'Semi-Annual':
                mounthValue  = responseData[i].premium/6.0;
                annualValue = responseData[i].premium*2.0;
                break;
            default:
                mounthValue  = responseData[i].premium/12.0;
                annualValue = responseData[i].premium;
                break;
        }
    
        carrierCont.innerHTML = `<input type="text" id="carrierOp${i+4}" maxlength = 10></input>`;
        premiumCont.innerHTML = `<input type="number" id="premiumOp${i+4}" ></input>`;
        annualCont.innerHTML  = `<input type="number" id="annualOp${i+4}"  ></input>`;
        mounthCont.innerHTML  = `<input type="number" id="mounthOp${i+4}"  ></input>`;
        
        const auxCarrier  = document.getElementById(`carrierOp${i+4}`);
        const auxPremium  = document.getElementById(`premiumOp${i+4}`);
        const auxAnnual  = document.getElementById(`annualOp${i+4}`);
        const auxMounth  = document.getElementById(`mounthOp${i+4}`);

        auxCarrier.value = responseData[i].carrier;
        auxPremium.value = responseData[i].premium;
        auxAnnual.value  = annualValue;
        auxMounth.value  = mounthValue;
    }

});


ageElement.addEventListener("change",function(){

    requestData.ageInput = parseInt(this.value); 
    console.log('reques arr', requestData);
});
