import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} Starting transaction...`);
  console.log('Body -->', JSON.stringify(req.body));
  next();
};
