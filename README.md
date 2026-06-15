# Student Management System

A simple server-side rendered student management project built with `Node.js`, `Express`, `EJS`, and `PostgreSQL`.

## Group Members

- Yeabsira Tadesse  029/BSC-B5/2023
- Nathan George     055/BSC-B5/2023
- Noah Assefa       020/BSC-B5/2022
- Yeabkal Abayew    090/BSC-B5/2023
- Kidus Tariku      045/BSC-B5/2023

## Features

- Login and logout
- Protected student pages
- View all students
- Add a new student
- Edit student details
- Delete student records
- EJS partials for reusable layout pieces
- Simple middleware for shared page data

## Technologies Used

- Node.js
- Express.js
- EJS
- PostgreSQL
- HTML
- CSS

## Installation Steps

1. Install dependencies:

```bash
npm install
```

2. Create the environment file:

```bash
copy .env.example .env
```

3. Update `.env` with your PostgreSQL credentials.

4. Create the database and run the schema:

```bash
createdb student_management
psql -U postgres -d student_management -f schema.sql
```

5. Start the application:

```bash
npm run dev
```

6. Open the app in your browser:

```bash
http://localhost:5000
```

7. Log in with the default account:

- Email: `admin@student.com`
- Password: `admin123`

## Environment Variables

- `APP_PORT`
- `DB_USER`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_PASSWORD`

## Project Structure

- `app.js` main server
- `config/db.js` PostgreSQL connection
- `controller/studentController.js` page logic
- `models/StudentModel.js` database queries
- `routes/studentRoutes.js` web routes
- `middleware/siteMiddleware.js` shared page data
- `views/` EJS pages and partials
- `public/css/styles.css` styling
- `controller/userController.js` login and logout logic

## GitHub Repository Link

Add your repository link here:

`https://github.com/yeabs-spec/Web-assignment-`

## Notes

- This project follows the assignment requirement for SSR using `Node.js`, `Express`, `EJS`, and `PostgreSQL`.
- The app includes CRUD operations, form handling, routing, middleware, and shared EJS partials.
