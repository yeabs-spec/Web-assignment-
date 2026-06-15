const router     = require('express').Router();
const controller = require('../controller/studentController');

router.get('/', controller.getAllStudents);
router.get('/new', controller.showCreateForm);
router.post('/', controller.createStudent);
router.get('/:id/edit', controller.getStudent);
router.post('/:id', controller.updateStudent);
router.post('/:id/delete', controller.deleteStudent);

module.exports = router;
