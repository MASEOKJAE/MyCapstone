class User {
    constructor() {
      this.name = '';
      this.email = '';
      this.id = '';
      this.department = '';
      this.account = '';
    }
  
    static getInstance() {
      if (!User.instance) {
        User.instance = new User();
      }
      return User.instance;
    }
  
    setUserInfo(name, email, id, department, account) {
      this.name = name;
      this.email = email;
      this.id = id;
      this.department = department;
      this.account = account;

      console.log(this.name); // 값 확인을 위한 console.log()
    }
  }
  
  export default User;  