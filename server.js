const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const squel = require('squel');

const app = express();
const port = 5000;

// Parse JSON request bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST'],
    optionsSuccessStatus: 200 // legacy browsers 
}));

// Open the SQLite database
const db = new sqlite3.Database('./students.db');

// GET endpoint to fetch all records from the student table
app.get('/students', (req, res) => {
    const query = squel.select()
        .from('student')
        .toString();

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// Insert a new record into the student table
app.post('/students', (req, res) => {
    const { first_name, last_name, date_of_birth } = req.body;
    const query = squel.insert()
        .into('student')
        .set('first_name', first_name)
        .set('last_name', last_name)
        .set('date_of_birth', date_of_birth)
        .toString();

    db.run(query, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const studentId = this.lastID;
        res.json({ id: studentId });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
