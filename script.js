const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const allClear = document.querySelector('#all-clear');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const equals = document.querySelector('#equal');

let fstOperator = null;
let sndOperator = null;
let fstOperand = null;
let sndOperand = null;
let result;

var displayValue = "0";

function updateDisplay() {
    display.textContent = displayValue;

    if (displayValue.length > 12) {
        display.textContent = displayValue.substring(0, 12);
    }
}

updateDisplay();

// Number input
numbers.forEach((number) => {
    number.onclick = () => {
        if (fstOperator === null) {
            if(displayValue === '0' || displayValue === 0) {
                displayValue = number.textContent;
            } else if (displayValue === fstOperand) {
                displayValue = number.textContent;
            } else {
                displayValue += number.textContent;
            }
        } else {
            if (displayValue === fstOperand) {
                displayValue = number.textContent;
            } else {
                displayValue += number.textContent;
            }
        }

        updateDisplay();
    };
});

// Dot input
dot.onclick = () => {
    if (!display.textContent.match(/\./))
        displayValue += dot.textContent;

    updateDisplay();
};

allClear.onclick = () => {
    displayValue = '0';
    fstOperand = null;
    sndOperand = null;
    fstOperator = null;
    sndOperator = null;
    result = null;
    updateDisplay();
};

clear.onclick = () => {
    if (display.textContent.length > 1)
        display.textContent = display.textContent.slice(0, -1);
    else display.textContent = '0';
};

// Operator functions
operators.forEach((operator) => {
    operator.onclick = () => {
        if (fstOperator !== null && sndOperator === null) {
            sndOperand = displayValue;
            sndOperator = operator.textContent;
            result = operate(Number(fstOperand), Number(sndOperand), fstOperator);
            displayValue = roundAccurately(result, 15).toString();
            fstOperand = displayValue;
            result = null;
        } else if (fstOperator !== null && sndOperator !== null) {
            sndOperand = displayValue;
            result = operate(Number(fstOperand), Number(sndOperand), sndOperator);
            sndOperator = operator.textContent;
            displayValue = roundAccurately(result, 15).toString();
            fstOperand = displayValue;
            result = null;
        } else {
            fstOperator = operator.textContent;
            fstOperand = displayValue;
        }

        updateDisplay();
    };
});

equals.onclick = () => {
    if (fstOperator === null) {
        displayValue = displayValue;
    } else if (sndOperator != null) {
        sndOperand = displayValue;
        result = operate(Number(fstOperand), Number(sndOperand), sndOperator);
        if (result === 'Infinity') {
            displayValue = 'Infinity';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            fstOperand = displayValue;
            sndOperand = null;
            fstOperator = null;
            sndOperator = null;
            result = null;
        }
    } else {
        sndOperand = displayValue;
        result = operate(Number(fstOperand), Number(sndOperand), fstOperator);
        if (result === 'Infinity') {
            displayValue = 'Infinity';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            fstOperand = displayValue;
            sndOperand = null;
            fstOperator = null;
            sndOperator = null;
            result = null;
        }
    }

    updateDisplay();
}

// Operate
function operate(a, b, op) {
    if (op === '+') {
        return a + b;
    } else if (op === '-') {
        return a - b;
    } else if (op === '*') {
        return a * b;
    } else if (op === '/') {
        if (b === 0) return 'Infinity';
        else return a / b;
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}