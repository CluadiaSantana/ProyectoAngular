import { User } from "./user";
export interface Record {
    teacherId: string,
    studentId: string,
    date: string,
    hour: string,
    status:string
    teacher: User[];
    student: User[];
}
