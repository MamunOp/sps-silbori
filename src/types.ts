export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'parent' | 'student';
  displayName: string;
}

export interface Application {
  id: string;
  studentName: string;
  grade: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  aadhaarNumber: string;
  photoUrl?: string;
  
  mobileNumber: string;
  alternateMobileNumber?: string;
  email?: string;
  
  village: string;
  district: string;
  state: string;
  pincode: string;
  
  fatherName: string;
  motherName: string;
  guardianName?: string;
  parentMobile: string;
  parentOccupation?: string;
  annualIncome?: string;
  
  parentId: string;
  parentEmail: string;
  
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: any;
  admissionDate: any;
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  parentId: string;
  enrolledAt: any;
}

export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  dueDate: any;
  status: 'unpaid' | 'paid' | 'overdue';
  createdAt: any;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: string;
  paidAt: any;
  userId: string;
}
