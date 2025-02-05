const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_+-={[}]\\|";:><,./?';




let password = "";
let passwordLength = 10;
let checkCount = 0;
// set strength circle color to grey
handleSlider();

// set passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // indicator.style.box-shadow = red; shadow
}

function getrandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumber() {
  return getrandomInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getrandomInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getrandomInteger(65, 91));
}

function generateSymbol() {
  const randomNumber = getrandomInteger(0, symbols.length);
  return symbols.charAt(randomNumber);
}

function calculateStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if ((hasLower || hasUpper)(hasNum || hasSym)) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }

  // to make copy text visible
  copyMsg.classList.add = "active";
  // after 2 second the msg will disappear
  setTimeout(() => {
    copyMsg.classList.remove = "active";
  }, 2000);
}

function shufflePassword(array){
    //fisher yetas method
     for ( let i = array.length - 1; i > 0; i-- ) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array [i];
        array[i] = array [j];
        array[j]= temp;
     }

     let str =  "";
     array.forEach((el)=>(str += el));
     return str;
}

function handleCheckBoxChange (){
    checkCount = 0; 
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    // spl condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider(); 
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange)
})


inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected 
    if(checkCount <=0) return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider(); 
    }

    // let's start the journey to find new password 

    // remove old password 
    password = "";
    
    // stuff to add mentionaed by chkbox

    // if (uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if (lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if (numbersCheck.checked){
    //     password+=generateNumber();
    // }
    // if (symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funArr = [];

    if (uppercaseCheck.checked)
        funArr.push(generateUpperCase);
    
    if (lowercaseCheck.checked)
        funArr.push(generateLowerCase);
    
    if (numbersCheck.checked)
        funArr.push(generateNumber);
    
    if (symbolsCheck.checked)
        funArr.push(generateSymbol);
    
    // compulsary addition

    for (let i=0;i<funArr ;i++){
        password += funArr[i]();
    }


    // remaing addition
    for(let i = 0; i<passwordLength-funArr.length;i++){
        let randIndex = getrandomInteger(0,funArr.length);
        password += funArr[randIndex](); 
    }


    // shuffing the password

    password = shufflePassword(Array.from(password));
    
    // show in UI 

    passwordDisplay.value = password;

    calculateStrength();
})