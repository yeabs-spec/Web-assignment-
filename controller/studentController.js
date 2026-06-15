const Student = require('../models/StudentModel');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAllStudents();
        res.render('students/index', {
            title: 'Students',
            students,
            message: req.query.message || ''
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

const showCreateForm = (req, res) => {
    res.render('students/new', {
        title: 'Add Student',
        student: {},
        error: ''
    });
};

const getStudent = async (req, res) => {
    try {
        const student = await Student.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).render('404', {
                title: 'Student not found'
            });
        }

        res.render('students/edit', {
            title: 'Edit Student',
            student,
            error: ''
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const { fullname, email, department, phone } = req.body;

        if (!fullname || !email || !department) {
            return res.status(400).render('students/new', {
                title: 'Add Student',
                student: req.body,
                error: 'Full name, email, and department are required.'
            });
        }

        await Student.createStudent({ fullname, email, department, phone });
        res.redirect('/students?message=Student%20added%20successfully');
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).render('students/new', {
                title: 'Add Student',
                student: req.body,
                error: 'That email is already in use.'
            });
        }

        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { fullname, email, department, phone } = req.body;

        if (!fullname || !email || !department) {
            const currentStudent = await Student.getStudentById(req.params.id);
            return res.status(400).render('students/edit', {
                title: 'Edit Student',
                student: { ...currentStudent, ...req.body },
                error: 'Full name, email, and department are required.'
            });
        }

        const student = await Student.updateStudent(req.params.id, { fullname, email, department, phone });
        if (!student) {
            return res.status(404).render('404', {
                title: 'Student not found'
            });
        }

        res.redirect('/students?message=Student%20updated%20successfully');
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).render('students/edit', {
                title: 'Edit Student',
                student: { ...req.body, id: req.params.id },
                error: 'That email is already in use.'
            });
        }

        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.deleteStudent(req.params.id);
        if (!student) {
            return res.status(404).render('404', {
                title: 'Student not found'
            });
        }

        res.redirect('/students?message=Student%20deleted%20successfully');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

module.exports = {
    getAllStudents,
    showCreateForm,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
