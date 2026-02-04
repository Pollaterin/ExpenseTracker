import express from 'express';

const app = express();
app.use(express.json());

let expenses = [
  { id: 1, description: 'Coffee', amount: 5, date: '2026-02-04' }
];

app.post('/expenses', (req, res) => {
    const newExpense = req.body; 
    newExpense.id = (expenses.at(-1)?.id ?? 0) + 1; 
    expenses.push(newExpense); 
    res.status(201).json({ message: 'Expense added successfully', data: newExpense });
});

app.get('/expenses', (req, res) => {
    res.json(expenses);
});

app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    expenses = expenses.filter(expense => expense.id != id);
    res.json({ message: 'Expense deleted successfully' });
});

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.listen(3000, () => console.log('Server is running!'));