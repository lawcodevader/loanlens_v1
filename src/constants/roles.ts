export const roles = {
  ADMIN: 'admin',
  ADVOCATE: 'advocate',
  BORROWER: 'borrower',
} as const;

export type UserRole = typeof roles[keyof typeof roles];