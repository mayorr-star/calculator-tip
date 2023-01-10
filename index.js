// Getting the required elements
const billInput = document.getElementById('bill');
const tipBtn = document.querySelectorAll('#tip-percent');
const customInput = document.getElementById('custom');
const peopleInput = document.getElementById('people');
const resetBtn = document.getElementById('reset-btn');
const amountPerPerson = document.getElementById('amt-per');
const totalPerPerson = document.getElementById('total-per');
const error = document.getElementById('error');

let billValue = 0;
let tipValue = 0;
let peopleValue= 0;

// Fucntions
function validateBill(){
    if (billInput.value.includes(',')){
        billInput.value.replace(',', '.')
    }
    billValue = parseFloat(billInput.value)
    calculate()
    console.log(billValue)
}

function validatePeople(){
    peopleValue = parseInt(peopleInput.value)
    if (peopleValue === 0){
        error.textContent = "Can't be zero"
        error.style.display = 'block'
        setTimeout(() => {
            error.textContent = ''
        }, 2000)
    }
    calculate()
    console.log(peopleValue)
}

// // Getting the the innerHTML as value of each button  
function checkButtonValue(e){
    tipBtn.forEach((button) =>  {
        if (e.target.innerHTML === button.innerHTML){
            tipValue = parseFloat(button.innerHTML) / 100 
        }
        console.log(tipValue)
    })
    customInput.value = '';
    calculate()
}

function calculate(){
    let tipPerPerson = 0;
    let total = 0;
    if (peopleValue > 0){
        tipPerPerson = (billValue * tipValue) / peopleValue;
        total = (billValue / peopleValue) + tipPerPerson;
    }
    amountPerPerson.textContent = '$' + tipPerPerson.toFixed(2);
    totalPerPerson.textContent = '$' + total.toFixed(2);
    
}

function checkCustomValue(){
    if (customInput.value > 0){
        tipValue = parseFloat(customInput.value) / 100
        calculate()
    }
    console.log(tipValue)
}

function reset(){
    customInput.value = '';
    peopleInput.value = 1;
    billInput.value = '';
    amountPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
    tipValue = '';
    billValue = '';
    peopleValue = 1;
}

// Event listeners
tipBtn.forEach((btn) => {
    btn.addEventListener('click', checkButtonValue)
})

resetBtn.addEventListener('click', reset);

billInput.addEventListener('input', validateBill);

peopleInput.addEventListener('input', validatePeople);

customInput.addEventListener('input', checkCustomValue);
