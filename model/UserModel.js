import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    //set lastname as Object because we will set some default value
    lastName : {
        type: String,
        default : 'lastName'
    },
    location : {
        type: String,
        default : 'my-city',
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user',
    },
    avatar : String,
    avatarPublicId : String
});

//Write an instance method
UserSchema.methods.toJSON = function(){     //toJSON is the function name 
    let obj = this.toObject();  //assign obj to the user instance i.e convert user to good old javascript object
    delete obj.password; //delete password property
    return obj;
}

export default mongoose.model('User', UserSchema);