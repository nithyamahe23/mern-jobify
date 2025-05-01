import { StatusCodes } from "http-status-codes";

import Job from '../model/JobModel.js';
import User from "../model/UserModel.js";
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async(req, res) => {

    const user = await User.findOne({_id : req.user.userId});   //when mongo creates an id it wqill be _id

    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user : userWithoutPassword});
}

export const getApplicationStats = async(req, res) => {
    //return the users and jobs
    const users = await User.countDocuments();
    
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({users, jobs});
}

export const updateUser = async(req, res) => {
    console.log('in update user');
    //delete the password associated with request
    let newUser = {...req.body};    //spread the properties of request  
    console.log(newUser);
    delete newUser.password;
    //get the user associated with the id
    //const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);

    //check whether the user has sent a file
    if(req.file){
        //Format the image to be sent to cloudinary
        const file = formatImage(req.file);

        const response = await cloudinary.v2.uploader.upload(file);
        //If the image is uploaded successfully to cloudinary, remove it in anyother place i.e. uploads folder
        //We are commenting it - because we no longer use disk storage
        //await fs.unlink(req.file.path); 

        //From the response, set user's avatar and avatarPublicId
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    

    const oldUserDetails = await User.findByIdAndUpdate(req.user.userId, newUser);

    //Check whether there is a file and user has an old publicId
    if(req.file && oldUserDetails.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(oldUserDetails.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({user : oldUserDetails});
}