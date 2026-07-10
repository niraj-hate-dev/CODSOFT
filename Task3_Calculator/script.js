// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// We now only need one variable to store the whole equation
let expression = ''; 

function updateDisplay(value) {
    display.innerText = value === '' ? '0' : value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // Handle Clear (C)
        if (button.classList.contains('clear')) {
            expression = '';
            updateDisplay(expression);
        } 
        
        // Handle Equals (=)
        else if (button.classList.contains('equals')) {
            try {
                // Sanitize the expression to ensure only math characters are evaluated
                const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
                
                // Evaluate the math string (e.g., "1+2" becomes 3)
                // We use the Function constructor as a safer alternative to eval()
                const result = new Function('return ' + sanitizedExpression)();
                
                // Prevent showing "undefined" if equals is pressed empty
                if (result !== undefined) {
                    expression = result.toString();
                    updateDisplay(expression);
                }
            } catch (error) {
                // Handle invalid equations like "1++2"
                updateDisplay("Error");
                expression = ''; 
            }
        } 
        
        // Handle Numbers and Operators
        else {
            // Prevent multiple operators in a row (optional, but good practice)
            const lastChar = expression.slice(-1);
            const isOperator = ['+', '-', '*', '/'].includes(value);
            const lastCharIsOperator = ['+', '-', '*', '/'].includes(lastChar);

            if (isOperator && lastCharIsOperator) {
                // Replace the last operator if a new one is typed
                expression = expression.slice(0, -1) + value;
            } else {
                expression += value;
            }
            
            updateDisplay(expression);
        }
    });
});