import { Router } from 'express';
import { body } from 'express-validator';
import {
  getLeads, getLead, createLead, updateLead, deleteLead, exportLeads,
} from '../controllers/leadController';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/rbac';

const router = Router();

const leadValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('status').isIn(['New', 'Contacted', 'Qualified', 'Lost']).withMessage('Invalid status'),
  body('source').isIn(['Website', 'Instagram', 'Referral']).withMessage('Invalid source'),
];

router.use(protect);
router.get('/export', exportLeads);
router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', leadValidation, createLead);
router.put('/:id', leadValidation, updateLead);
router.delete('/:id', adminOnly, deleteLead);

export default router;