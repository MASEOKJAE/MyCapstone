import profilePhoto from '../assets/images/avatars/avatar_default.jpg';
import User from '../shareInfo/userInfo';

const user = User.getInstance();
console.log("교수 -> " + user.name);


const account = {
    displayName: user.name,
    department: user.department,
    studentID: user.address,
    email: user.email,
  };
  
  export default account;
  