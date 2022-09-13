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

const stateValue    = stateElement.value;
const planValue     = planElement.value;
const periodValue   = periodElement.value;

var ageRaa = 0;

const getAge = (myBirthdate)=>{
    
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
    return age;
    
};

const getPremium = ()=>{
    console.log('Raaaaa')
};

dateBirth.addEventListener("change",function(){
    
    if(this.value){
        ageRaa = this.value;
        console.log(`My age is : ${getAge(this.value)} years old`);
    }
});

stateElement.addEventListener("change",function(){
            console.log('state ', this.value);
});


planElement.addEventListener("change",function(){
    console.log('plan ', this.value);
});

periodElement.addEventListener("change",function(){
    console.log('period ', this.value);
});

ageElement.addEventListener("change",function(){
    console.log('Age',this.value);   
});

console.log('El value',dateBirth.value)
console.log('Raaa',ageRaa)