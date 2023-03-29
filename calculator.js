const calculatorForm = document.getElementById("calculator-form");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const operator = document.getElementById("operator");
const result = document.getElementById("result");
const clearHistoryBtn = document.getElementById("clear-history");
const historyList = document.getElementById("history-list");
const historyCount = document.getElementById("history-count");
const operationCount = document.getElementById("operation-count");

let history = [];

calculatorForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const num1 = Number(input1.value);
    const num2 = Number(input2.value);
    const operation = operator.value;
    let output;

    switch(operation) {
        case "+":
            output = num1 + num2;
            break;
        case "-":
            output = num1 - num2;
            break;
        case "*":
            output = num1 * num2;
            break;
        case "/":
            output = num1 / num2;
            break;
        case "%":
            output = num1 % num2;
            break;
        default:
            output = "Invalid operation";
            break;
    }

    result.textContent = output;
    history.push(`${num1} ${operation} ${num2} = ${output}`);
    localStorage.setItem("history", JSON.stringify(history));
    updateHistory();
});

clearHistoryBtn.addEventListener("click", function() {
    history = [];
    localStorage.clear();
    updateHistory();
});

function updateHistory() {
    historyList.innerHTML = "";
    for (let i = Math.max(history.length - 5, 0); i < history.length; i++) {
        const li = document.createElement("li");
        li.textContent = history[i];
        historyList.appendChild(li);
    }

    historyCount.textContent = history.length;
    const operations = {};
    history.forEach(item => {
        const operation = item.split(" ")[1];
        console.log(item);
        if (operations[operation]) {
            operations[operation]++;
        } else {
            operations[operation] = 1;
        }
    })

    let operationHTML = "";
    for (const operation in operations) {
        const count = operations[operation];
        operationHTML += `${operation}: ${count} шт, `;
    }
    operationCount.textContent = operationHTML.slice(0, -2);
}





