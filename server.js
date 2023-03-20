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

app.get('/students', (req, res) => {
    const query = squel.select()
        .from('students')
        .toString();

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post('/students', (req, res) => {
    const { first_name, last_name, date_of_birth } = req.body;
    const query = squel.insert()
        .into('students')
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

app.get('/courses', (req, res) => {
    const query = squel.select()
        .from('courses')
        .toString();

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post('/courses', (req, res) => {
    const { course } = req.body;
    const query = squel.insert()
        .into('courses')
        .set('course', course)
        .toString();

    db.run(query, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const courseId = this.lastID;
        res.json({ id: courseId });
    });
});


app.get('/grades', (req, res) => {
    const query = squel.select()
        .field('first_name || " " || last_name', 'student')
        .field('courses.course')
        .field('grades.grade')
        .from('grades')
        .join('students', null, 'grades.student_id = students.id')
        .join('courses', null, 'grades.course_id = courses.id')
        .toString();

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post('/grades', (req, res) => {
    const { grade, student_id, course_id } = req.body;
    const query = squel.insert()
        .into('grades')
        .set('grade', grade)
        .set('student_id', student_id)
        .set('course_id', course_id)
        .toString();

    db.run(query, function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(403).json({ error: 'Already exists' });
            } else {
                return res.status(500).json({ error: err.message });
            }
        }
        const gradeId = this.lastID;
        res.json({ id: gradeId });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
