const db = require('../config/db');

const getAllStudents = async () => {
    const result = await db.query('SELECT * FROM students ORDER BY fullname ASC');
    return result.rows;
};

const getStudentById = async (id) => {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
};

const createStudent = async ({ fullname, email, department, phone }) => {
    const query = 'INSERT INTO students (fullname, email, department, phone) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await db.query(query, [fullname, email, department, phone]);
    return result.rows[0];
};

const updateStudent = async (id, { fullname, email, department, phone }) => {
    const query = 'UPDATE students SET fullname=$1, email=$2, department=$3, phone=$4 WHERE id=$5 RETURNING *';
    const result = await db.query(query, [fullname, email, department, phone, id]);
    return result.rows[0];
};

const deleteStudent = async (id) => {
    const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
