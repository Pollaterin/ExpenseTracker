import express from 'express';

const app = express();
app.use(express.json());

let expenses = [
  { id: 1, category: 'Food', description: 'Coffee', amount: 5, date: '2026-02-04' }
];

let budgets = {
    "Food": 1000,
    "Transport": 600,
};

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.post('/expenses', (req, res) => {
    const newExpense = req.body; 
    newExpense.id = (expenses.at(-1)?.id ?? 0) + 1; 
    expenses.push(newExpense); 
    res.status(201).json({ message: 'Expense added successfully', data: newExpense });
});

app.get('/expenses', (req, res) => {
    res.json(expenses);
});

app.get('/expenses', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredExpenses = expenses.filter(expense => expense.category === category);
        return res.json(filteredExpenses);
    }
    res.json(expenses);
});

const filteredExpenses = expenses.filter(expense => {
    let d = new Date(expense.date);
    let start = new Date(startDate);
    let end = new Date(endDate);
    if (d >= start && d <= end) {
        return true;  
    } else {
        return false; 
    }
});

app.post('/budget', (req, res) => {
    const { category, amount } = req.body;
    if (!category || !amount) {
        return res.status(400).json({ message: "Category and amount are required" });
    }
    budgets[category] = amount; 
    res.json({ message: `Budget for ${category} set to ${amount}`, budgets });
});

app.get('/budget/status', (req, res) => {
    let status = [];
    for (let category in budgets) {
        let totalSpent = 0;
        expenses.forEach(exp => {
            if (exp.category === category) {
                totalSpent += exp.amount;
            }
        });
        let limit = budgets[category];
        let exceeded = totalSpent > limit;
        status.push({
            category: category,
            spent: totalSpent,
            limit: limit,
            isExceeded: exceeded,
            remaining: limit - totalSpent
        });
    }

    res.json(status);
});

app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    expenses = expenses.filter(expense => expense.id != id);
    res.json({ message: 'Expense deleted successfully' });
});

app.listen(3000, () => console.log('Server is running!'));