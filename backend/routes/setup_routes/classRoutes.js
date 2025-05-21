import express from 'express';
import {
    getAllClasses,
    getClassById,
    addClass,
    updateClass,
    deleteClass
} from '../../controllers/setup_management/classController.js';

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', addClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
