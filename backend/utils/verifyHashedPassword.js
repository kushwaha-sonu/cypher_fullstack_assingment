import bcrypt from 'bcrypt';

const verifyHashedPassword = async (db_password,user_password) => {
 
    return await bcrypt.compare(db_password, user_password);
}

export default verifyHashedPassword;