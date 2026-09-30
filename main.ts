import {UserDAO} from "./UserDAO.ts";

const userDAO = new UserDAO();
userDAO.insert('อัมพร','saf54j@gmail.com');
userDAO.insert('ไทย','agda45ga@gmail.com');
userDAO.insert('ชัยการ','ssg24gafj@gmail.com');




const users = userDAO.findAll();
users.forEach(u=>{
    console.log(u.getInfo());
    
});