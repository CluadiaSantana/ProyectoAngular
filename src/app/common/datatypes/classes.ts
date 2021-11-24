import { User } from "./user";

export interface Classes {
    year: number;
    numClasses: number;
    studentId: number;
    teacherId: number;
    weeklyHours: number;
    teacher?: User[];
    
}
