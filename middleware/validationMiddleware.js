import {body, param, validationResult} from 'express-validator';
import { BadRequestError, NotFoundError, UnAuthenticatedError, UnAuthorizedError } from '../errors/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import Job from '../model/JobModel.js';
import User from '../model/UserModel.js';
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
    //console.log('in validation errors');
    return[
        validateValues, 
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg );
                //In this case for all errors the code will be 400. but for No job id found we should have 404, so do the 
                //below check
                if(errorMessages[0].startsWith('No Job')){
                    throw new NotFoundError(errorMessages);
                }
                if(errorMessages[0].startsWith('Not Authorized')){
                    throw new UnAuthorizedError('Not Authorized to Access the route');
                }
                throw new BadRequestError(errorMessages);
            }
            //console.log(next());
            next();
        },
    ];
};

//pass in the values we want to validate
export const validateTest = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({min: 3, max: 50}).withMessage('name should be minumum 3 and maximum 50 characters long').trim(),
])

//validation for Job Input
export const validateJobInput = withValidationErrors(
    [
        body('company').notEmpty().withMessage('company is required'),
        body('position').notEmpty().withMessage('position is required'),
        body('jobLocation').notEmpty().withMessage('job location is required'),
        body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
        body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type value')
    ]
)

//validate ID param
// export const validataJobIdParam = withValidationErrors(
//     [
//         //access the param - name should be the same as in route
//         param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('invalid Mongo DB id value')  //implicit return
//     ]
// )

//Modify the above method to check whether the id is valid and also job with id exists in db
export const validataJobIdParam = withValidationErrors(
    [
        //access the param - name should be the same as in route
        param('id').custom( async(value, {req}) => {    //we want to access the req object as well
            console.log(req);
            const isValid = mongoose.Types.ObjectId.isValid(value);
            //explicit return
            if(!isValid)
                throw new BadRequestError('invalid Mongo DB id value');

            //check whether job with that id exists
            const job = await Job.findById(value);
            if(!job){
                throw new NotFoundError(`No Job with ID : ${value} found`);
            }

            //check whether user is admin
            const isAdmin = req.user.role === 'admin';
            //console.log(isAdmin);
             //check whether the user is the actual owner of the job
            const isOwner = req.user.userId === job.createdBy.toString();
            if(!isAdmin && !isOwner){
                throw new UnAuthorizedError('Not Authorized to Access the route');
            }
          })
   
   ]
)

//Validation for Register User
export const validateRegisterInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        //Check email format and whether it already exists.
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format')
                .custom(async(email) => {
                    const user = await User.findOne({email});
                    if(user){
                        throw new BadRequestError('User already exists');
                    }
                }),
        body('password').notEmpty().withMessage('password is required')
                .isLength({min : 8}).withMessage('password should be atleast 8 characters'),
        body('location').notEmpty().withMessage('location is required'),
        body('lastName').notEmpty().withMessage('last name is required'),
    ]
)

//To validate Login input
export const validateLoginInput = withValidationErrors(
    [
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
        body('password').notEmpty().withMessage('password is required')
    ]
)

//Validation for Update User
export const vaidateUpdateUserInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        //Check email format and whether it already exists.
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format')
                .custom(async(email , {req}) => {
                    const user = await User.findOne({email});
                    if(user && user._id.toString() !== req.user.userId){       //User with email exists but with diff id. 
                        throw new BadRequestError('User already exists');
                    }
                }),
        body('location').notEmpty().withMessage('location is required'),
        body('lastName').notEmpty().withMessage('last name is required'),
    ]
)