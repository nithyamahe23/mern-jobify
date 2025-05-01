import bcrypt from 'bcryptjs';

export const hashPassword = async(password) => {
    //Create hashed password
        //random number to be added to password when hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
}

//compare password
export const comparePassword = async(password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}