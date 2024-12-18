const  Joi = require('joi');

const updateContestantSchema = Joi.object({
    displayName: Joi.string().required().min(1).max(50),
    location: Joi.string().required().min(1).max(100),
    dob: Joi.string().required().custom((value, helpers) => {
      const datePattern = /^\d{1,2}-\d{1,2}-\d{4}$/;
      if (!datePattern.test(value)) {
        return helpers.message('Dob must be in M-D-YYYY format (e.g., 3-2-1990)');
      }
      return value;
    }),
    
    sex: Joi.string().required().valid('Male', 'Female', 'Other'),
    occupation: Joi.string().required().min(1).max(100),
    aboutMe: Joi.string().required().min(1).max(500)
  });

  const updateUserSchema =Joi.object({
name:Joi.string().required().min(1).max(50),
displayName: Joi.string().required().min(1).max(50),
email: Joi.string().required().email({ minDomainSegments: 2 }).max(100),
location: Joi.string().required().min(1).max(100)
  });

  module.exports = {updateContestantSchema,updateUserSchema};
