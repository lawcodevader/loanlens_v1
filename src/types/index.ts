import { UserRole } from '../constants/roles';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  profilePhoto?: string;
}

export interface Loan {
  id: string;
  applicantName: string;
  city: string;
  state: string;
  mortgageAmount: number;
  status: 'pending' | 'verified' | 'allocated' | 'completed';
}

export interface Document {
  name: string;
  mandatory: boolean;
  type: 'auto' | 'user' | 'notSubmitted';
}

export interface Checklist {
  id: string;
  name: string;
  state: string;
  documents: Document[];
  createdAt: string;
  adherenceRate: number;
  automationLevel: number;
}

export interface VerificationRequest {
  id: string;
  loanId: string;
  applicantName: string;
  checklistId: string;
  status: 'pending' | 'submitted' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Advocate {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profilePhoto?: string;
  caseLoad: number;
  status: 'active' | 'inactive';
}