// const exchangeUrl = "https://api.frankfurter.app/latest?from=INR&to=USD";
const dropdown = document.querySelectorAll(".select-contury select");
const inputData = document.querySelector("input");
const submitBtn = document.querySelector("button"); 
const fromCurr = document.querySelector(".from");
const toCurr = document.querySelector(".to");
const showMeg = document.querySelector(".result");


for(let select of dropdown){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if( select.className === "from" && currcode ==="INR"){
            newOption.selected = "selected"; 
        } else if(select.className === "to" && currcode ==="USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target); 
    })
}

const updateFlag = (element)=>{
    let currcode = element.value;              // getting the currency code by value.
    let countryCode = countryList[currcode];
    console.log(countryCode);
    let newflag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    // flagUrl.src = newflag;
    let img = element.parentElement.querySelector("img");
    img.src = newflag;
}

submitBtn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let myData = inputData.value;
    if(myData<=0 || myData === 1 || myData == ""){
        myData = 1;
    }

    let exchangeUrl = `https://api.frankfurter.app/latest?from=${fromCurr.value}&to=${toCurr.value}`;
    let response =await fetch(exchangeUrl);
    let data = await response.json();
    // let rate = data[toCurr.value] ;
    // console.log(data);
    const firstKey = Object.values(data["rates"])[0];
    let finalAmount = firstKey * myData;
    showMeg.innerText = `${myData} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`    

})
