let display=document.getElementById('display')
let buttons=document.querySelectorAll('.key')
let themeRadios=document.querySelectorAll('input[name="theme"]')

let currentValue='0'
let firstNumber=null
let operator=null
let waitingForSecondOperand= false

// Show the current value on the calculator display 
function updateDisplay(){
    display.textContent=currentValue.replace('.',',')
}

// Handle inputnumber
function inputNumber(num){
    if(waitingForSecondOperand){
        currentValue=num
        waitingForSecondOperand=false
    }
    else{
        currentValue=currentValue==='0' ? num:currentValue+num
    }
     updateDisplay()
}

// Handle decimal input 
function inputDecimal(){
    if(waitingForSecondOperand){
        currentValue='0'
        waitingForSecondOperand=false
    }
    else if(!currentValue.includes('.')){
        currentValue+='.'

    }
    updateDisplay()
}


// Handle operator button 
function handleOperator(op){
    let inputValue=parseFloat(currentValue)
    if(operator&&!waitingForSecondOperand){
        calculate()
    }
    firstNumber=inputValue
    operator=op
    waitingForSecondOperand=true
}

// Perform the calculation using switch case 
function calculate(){
    if(!operator||waitingForSecondOperand)
        return
    let secondNumber=parseFloat(currentValue)
    let result=0
    switch(operator){
        case'+':
        result=firstNumber+secondNumber
        break
        case'-':
        result=firstNumber-secondNumber
        break
        case'*':
        result=firstNumber*secondNumber
        break
        case'/':
        result=firstNumber/secondNumber
        break
        default:
            return
    }
    currentValue =result.toString()
    operator=null
    updateDisplay()
}

// Remove last digit 
function deleteLastChar(){
    currentValue=currentValue.length===1 ? '0':currentValue.slice(0,-1)
    updateDisplay()
}

//Reset
function resetCalculator(){
    currentValue=0
    firstNumber=null
    operator=null
    waitingForSecondOperand=false
    updateDisplay()
}

//Button click
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent

        if (button.classList.contains('operator') && value !== '=') {
            handleOperator(value)
        } else if (button.classList.contains('equals')) {
            calculate()
        } else if (button.classList.contains('del')) {
            deleteLastChar()
        } else if (button.classList.contains('reset')) {
            resetCalculator()
        } else if (value === '.') {
            inputDecimal()
        } else {
            inputNumber(value)
        }
    })
})

//Theme toggle
themeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        document.body.className = `theme-${this.id.split('-')[1]}`
    })
})
updateDisplay()