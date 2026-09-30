import { StudentDAO } from "./StudentDAO";

const studentDAO = new StudentDAO();

studentDAO.insert('6605', 'สมศรี ดีใจ', 3.75);
studentDAO.insert('6604', 'สมชาติ ใจดี', 3.70);
studentDAO.insert('6606', 'กิตนะ มั่นคง', 3.65);

const students = studentDAO.findAll();
students.forEach(student => {
    console.log(`${student.getId()} ${student.getFullName()} ${student.getGpa()}`);
});