export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;   
    gender?: string;
    photoURL?: string;
    about?: string;
    skills?: string[]; 
}

export interface Request {
    _id: string;
    fromUserId: User;
}