const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

// Parse JSON request bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Open the SQLite database
const db = new sqlite3.Database('./students.db');

// GET endpoint to fetch all records from the student table
app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// Insert a new record into the student table
app.post('/students', (req, res) => {
    const { first_name, last_name, date_of_birth } = req.body;
    const sql = 'INSERT INTO student (first_name, last_name, date_of_birth) VALUES (?, ?, ?)';
    const values = [first_name, last_name, date_of_birth];

    db.run(sql, values, function (err) {
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
