import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './model/JobModel.js';
import User from './model/UserModel.js';

try {
    //console.log('⏳ Starting populateDB script...');
    await mongoose.connect(process.env.MONGO_URL);

    //We have to run the file twice. One for test user and other for admin
    //const user = await User.findOne({email:'test@test.com'});
    const user = await User.findOne({email:'medh.siru@gmail.com'});
    //console.log('user');
    //Get the jobs from mock data
    const jsonJobs = JSON.parse(
        await readFile(new URL('./utils/mockData.json', import.meta.url))
      );

    //console.log('Json jobs');
    const jobs = jsonJobs.map((job)=>{
        return {...job, createdBy:user._id}          //spread out the existing properties and add created by the user
    });
    //console.log('jobs');
    //Delete the jobs already existing for the user
    await Job.deleteMany({createdBy:user._id});

    //create the jobs
    await Job.create(jobs);
    console.log("Success!!!");
    process.exit(0);
} catch (error) {
    process.exit(1);
}