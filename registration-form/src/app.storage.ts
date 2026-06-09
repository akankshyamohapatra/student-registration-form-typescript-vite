import type { Student } from "./types";


const STORAGE_KEY= "students";

export function saveStudents(students: Student[]){

localStorage.setItem(STORAGE_KEY,JSON.stringify(students));

}


export function loadStudents(): Student[] {

const data= localStorage.getItem(STORAGE_KEY);

if(!data){
    return [];
}

return JSON.parse(data);
}