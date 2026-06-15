const db = require('../config/db');

const findUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const createUser = async ({ firstName, lastName, email, password }) => {
    const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await db.query(query, [firstName, lastName, email, password]);
    return result.rows[0];
};

const ensureDefaultUser = async () => {
    const existing = await findUserByEmail('admin@student.com');
    if (existing) {
        return existing;
    }

    return createUser({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@student.com',
        password: 'admin123'
    });
};

module.exports = { findUserByEmail, createUser, ensureDefaultUser };
