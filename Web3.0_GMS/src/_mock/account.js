// import profilePhoto from '../assets/images/avatars/avatar_default.jpg';
import User from '../shareInfo/userInfo';

const user = User.getInstance();
console.log("학생 -> " + user.name);

const account = {
  displayName: user.name,
  email: user.email,
  studentID: user.id,
  department: user.department,
  account: user.account
};

export default account;