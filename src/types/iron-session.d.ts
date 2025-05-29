import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    csrfSecret?: string;
    user?: {
      id: number;
      username: string;
    };
    sessionCreatedAt?: number;
    lastActivityAt?: number;
  }
}