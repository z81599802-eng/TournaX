import type { Router } from 'express';

export const registerHealthRoutes = (router: Router) => {
  router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });
};
