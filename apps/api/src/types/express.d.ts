import 'csurf';

declare global {
  namespace Express {
    interface Request {
      csrfToken?: () => string;
    }
  }
}
export {};
