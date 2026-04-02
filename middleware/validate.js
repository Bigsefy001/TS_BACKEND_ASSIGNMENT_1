/**
 * Simple validation helpers for Express routes.
 * Usage:
 *   import { requireFields } from '../middleware/validate.js'
 *   router.post('/:id/borrow', requireFields(['studentId','attendantId']), borrowBook)
 */

export function requireFields(fields = []) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const missing = fields.filter((f) => {
      const val = req.body[f];
      return val === undefined || val === null || (typeof val === 'string' && val.trim() === '');
    });

    if (missing.length) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    }

    next();
  };
}

export default { requireFields };

