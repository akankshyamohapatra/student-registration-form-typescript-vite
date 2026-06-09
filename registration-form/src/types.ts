export interface Student{

id:string;
fname: string;
lname: string;
gender: string;
nationality: string;
edlevel: string;
gpa: number | null;
school: string;
city: string;
dob: string;
study: string;
email: string;
phone: string;
street: string;
state: string;
pin: string;

}






export interface appState{

students: Student[];
editingId: string | null;

}