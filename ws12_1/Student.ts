export class Student {
    constructor(private id: number,private studentCode: string,private fullName: string,private gpa: number ) {}
    public getId(): number { return this.id; }
    public getStudentCode(): string { return this.studentCode; }
    public getFullName(): string { return this.fullName; }
    public getGpa(): number { return this.gpa; }
    
    public isHonors(): boolean {
        if (this.gpa >= 3.50) {
            return true;
        } else {
            return false;
        }
    }
    public getInfo(): string {
        const honorsText = this.isHonors() ? " (Honors)" : "";
        return `[${this.studentCode}] ${this.fullName} GPA: ${this.gpa.toFixed(2)}${honorsText}`;
    }
}