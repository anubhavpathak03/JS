document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = Array.isArray(JSON.parse(localStorage.getItem('expenses'))) ? JSON.parse(localStorage.getItem('expenses')) : [];

    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();

        // always remember that the input in form come as string what ever type is mention it always come as string

        const amount = parseFloat(expenseAmountInput.value.trim());


        if(name !== "" && !isNaN(amount) && amount >= 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            // clear Input
            expenseNameInput.value = ""; 
            expenseAmountInput.value = "";
        }
    });


    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <button data-id = "${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });    
    }

    expenseList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);

            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    });

    function calculateTotal() {
        return expenses.reduce((total,expense) => total+expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    } 

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
});