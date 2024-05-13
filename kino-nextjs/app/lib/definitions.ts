// Changed name on type because it's the same name as Session.User from nextAuth function from auth.ts Used by function getUserByEmail

export type DbUser = {
    id: string;
    name: string;
    email: string;
    password: string;
};
export type State = {
    errors?: Array<string>;
  };