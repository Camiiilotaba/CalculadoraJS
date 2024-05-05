document.addEventListener("DOMContentLoaded", function() {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('.btn');
    const operators = document.querySelectorAll('.operator, .operator-scientific'); 
    const equalButton = document.querySelector('.btn-equal');
    const clearButton = document.querySelector('.btn-clear');
    const toggleModeBtn = document.getElementById('toggleModeBtn');

    // Función para limpiar la pantalla
    clearButton.addEventListener('click', function() {
        screen.value = '';
    });

    // Función para añadir el valor del botón pulsado a la pantalla
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            screen.value += this.value;
        });
    });


    operators.forEach(operator => {
        operator.addEventListener('click', function() {
            // Si el operador es "^" (potencia), reemplazamos con "**"
            if (this.value === '^') {
                screen.value += '**';
            } else if (this.value === 'Raiz √') {
                // Si el operador es "Raiz √" (raíz cuadrada), agregamos la representación correcta a la pantalla
                screen.value += 'Math.sqrt(';
            } else {
                screen.value += this.value;
            }
        });
    });

    // Función para realizar la operación cuando se pulsa el botón de igual
    equalButton.addEventListener('click', function() {
        const expression = screen.value;
        // Verificamos si la expresión es válida
        if (expression) {
            const result = calculate(expression);
            if (result !== null) {
                if (result === Infinity || result === -Infinity) {
                    alert('No se puede dividir por cero.');
                    screen.value = '';
                } else if (Math.abs(result) > 100000000 * 1000000000000) {
                    alert('El resultado excede el límite permitido.');
                    screen.value = '';
                } else {
                    screen.value = result;
                }
            } else {
                alert('Expresión no válida');
                screen.value = '';
            }
        }
    });

 
    function calculate(expression) {
        // Esto hace quue al pulsar en Raiz, nos salga la operacion para poder realizarla
        expression = expression.replace(/Raiz √/g, 'Math.sqrt(');

        // Verificar si la expresión contiene una llamada a Math.sqrt(
        if (expression.includes('Math.sqrt(')) {
            // Contar el número de paréntesis de apertura
            const openParenthesesCount = (expression.match(/\(/g) || []).length;
            // Contar el número de paréntesis de cierre
            const closeParenthesesCount = (expression.match(/\)/g) || []).length;
            // Calcular la diferencia entre el número de paréntesis de apertura y el número de paréntesis de cierre
            const missingCloseParentheses = openParenthesesCount - closeParenthesesCount;
            // Agregar paréntesis de cierre faltantes si es necesario
            if (missingCloseParentheses > 0) {
                expression += ')'.repeat(missingCloseParentheses);
            }
        }

        // Evalua la expresion y devuelve el resultado
        return eval(expression);
    }

    
    toggleModeBtn.addEventListener('click', function() {
        
        const body = document.body;
       
        body.classList.toggle('dark-mode');
    });
});
