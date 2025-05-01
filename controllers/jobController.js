//import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/customError.js';
import Job from '../model/JobModel.js'
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

// //create the local array
// let jobs = [
//     {id:nanoid(), company:"google", position:"frontend"},
//     {id:nanoid(), company:"apple", position:"backend"}
// ];

export const getAllJobs = async(req, res) => {

    //console.log(req);
    //console.log(req.user);
    //To get all records from database
    console.log(req.query);

    const {search, jobStatus, jobType, sort} = req.query;

    //create the query object
    const queryObject = {
        createdBy : req.user.userId
    }
    //if search exists, add it to the query object
    if(search){
        //For position
        queryObject.$or = [
            {position:{$regex : search, $options: 'i'}},     //mongo db syntax, options i- dont care about casing
            {company:{$regex : search, $options: 'i'}}
        ]  
    }

    //Only if jobstatus is presnt and not equal to 'all' add to the search param
    if(jobStatus && jobStatus !== 'all'){
        queryObject.jobStatus = jobStatus;
    }

    if(jobType && jobType != 'all'){
        queryObject.jobType = jobType;
    }

    //Set the sort options
    const sortOptions = {
        newest : '-createdAt',
        oldest : 'createdAt',
        'a-z'   : 'position',
        'z-a'   : '-position'
    }

    //set the sort key
    const sortKey = sortOptions[sort] || sortOptions.newest;  //if sort value is not present in query param, default is newest

    //set up pagination
    //page from query parameter will be a string. Convert it to number. 
    //If page is not passed in query parameter, default to one
    const page = Number(req.query.page) || 1;

    //set the limit
    //In this project,we are not passing limit from front end. default to 10
    const limit = Number(req.query.limit) || 10;

    //set the skip
    const skip = (page - 1) * limit;

    //get the jobs associated with user
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    //get the total no of jobs
    const totalJobs = await Job.countDocuments(queryObject);

    //Calculate the total no of pages - need to send it back to front end display pages
    //Always round up 
    const numOfPages = Math.ceil(totalJobs / limit);
    console.log(jobs);
    //To get all instances with company name google
    //const jobs = await Job.find({company:'Google'});    
    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage : page, jobs});
};

export const createJob = async(req, res) => {
    //Add created by property to request
    console.log('in controller');
    req.body.createdBy = req.user.userId;
        //Create a job instance
        //const job = await Job.create({company, position});
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({job});
};

export const getJob = async(req, res) => {
    const {id} = req.params;
    //Check whether job is present
    const job = await Job.findById(id);
    //Comment the below check - we are doing this in validation
    //If job is not present
    //if(!job){
        //Instead directly returning, we can throw an error. it will be handled by error middleware
        //Autoamtically return gets greyed out coz it will not run
        //throw new Error('No job with ID found');
        //return res.status(404).json({msg:`No job with id ${id} found`});
        
        //Use not Found Error class
        //throw new NotFoundError(`No Job with ID : ${id} found`);
        
    //}
    res.status(StatusCodes.OK).json({job});
};

export const updateJob = async(req, res) => {
    const {id} = req.params;
    // const {company, position} = req.body;
    // //check whether both are present. If not send an error response
    // if(!company || !position){
    //     //Here a return should be there, else express will throw an error as there will be two responses
    //     return res.status(400).json({msg:'Please provide both Company and Position'});
    // }
    //check whether the job is already present
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, 
        {
            new : true,       //By default, the old job will be returned. To return the new object, set new:true
        }
    );
    //Remove this check as we are validating this in the middleware itself
    // if(!updatedJob){
    //     //Use not Found Error class
    //     throw new NotFoundError(`No Job with ID : ${id} found`);
    // }

    // //set the company and position
    // job.company = company;
    // job.position = position;
    res.status(StatusCodes.OK).json({msg:'Job Modified', updatedJob});
};

export const deleteJob = async(req, res) => {
    const {id} = req.params;

     //check whether the job is already present
     //const job = jobs.find((job) => (job.id) === id)
     const removedJob = await Job.findByIdAndDelete(id);
     //console.log(jobb);
     if(!removedJob){
         //Use not Found Error class
        throw new NotFoundError(`No Job with ID : ${id} found`);
     }

    
    // const newJobs = jobs.filter((job) => (job.id) !== id);
    // jobs = newJobs;

    res.status(StatusCodes.OK).json({msg : `Job with ID ${id} deleted`, job: removedJob});

};

//For stats
export const showStats = async(req, res) => {

    let stats = await Job.aggregate([
        //match stage - grab all the jobs associated with the user
        {
            //user id from req is a String. Convert it to object
            $match : {createdBy : new mongoose.Types.ObjectId(req.user.userId)}
        },
        //group the job by job status. The property should be set in a string
        {
            $group : { _id: '$jobStatus', count : {$sum : 1}}
        }   
     ]);

     //convert stats to object using reduce
     stats = stats.reduce((acc, curr) => {
        const{_id : title, count} = curr;   //create an object for current iteration. Replace _id with title
        acc[title] =count;
        return acc; 
     }, {});
    console.log(stats);


    //Sample data which front end expects 
    const defaultStats = {
        pending : stats.pending || 0,
        interviewed : stats.interview || 0,
        declined : stats.declined || 0
    };

    //Also return monthly stat for chart
    //return the no of applications sent out in past 6 months

    let monthlyApplications = await Job.aggregate([
        {
             //user id from req is a String. Convert it to object
             $match : {createdBy : new mongoose.Types.ObjectId(req.user.userId)}
        },
        //group by year and month
        {
            $group : {
                //set up an object _id
                _id :{year : {$year : '$createdAt'}, month:{$month : '$createdAt'}},
                count : {$sum : 1}
            }
        },
        //sort : latest record first
        {
            $sort : {'_id.year':-1, '_id.month':-1}
        },
        //set limit =6, to display only 6 jobs
        {
            $limit : 6
        }
    ]);

    //Format the output to this  
    //  {
    //         date : 'May 23',
    //         count : 10
    //     }

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id:{year, month}, count} = item;    //get the values from item

        //format using dayjs
        //we do month -1 because in dayjs month starts from 0 but in MongoDB Jan is 1
        const date = day().month(month-1).year(year).format("MMM YY");

        return {date , count};
    }).reverse();   //we are reversing because we initially sorted to get latest record first


    // let monthlyApplications = [
    //     //The order is important. latest month should be last
    //     {
    //         date : 'May 23',
    //         count : 10
    //     },
    //     {
    //         date : 'Jun 23',
    //         count : 20
    //     },
    //     {
    //         date : 'Jul 23',
    //         count : 15
    //     },
    // ]
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});

}