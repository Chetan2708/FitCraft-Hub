export interface LoginType {
    email: string;
    password: string;
  }
  
  export interface SignUpType {
    name: string;
    email: string;
    password: string;
    file?: File;
  }
  
  export interface User {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    pic?: string;
  }
  