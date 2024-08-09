import Joi from 'joi';

const updateContestantSchema = Joi.object({
    DisplayName: Joi.string().required().min(1).max(50),
    location: Joi.string().required().min(1).max(100),
    Dob: Joi.string().required().custom((value, helpers) => {
        const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (!datePattern.test(value)) {
          return helpers.message('Dob must be in YYYY-M-D format (e.g., 1990-2-3)');
        }
        return value;
      }), 
    sex: Joi.string().required().valid('Male', 'Female', 'Other'),
    hobby: Joi.string().required().min(1).max(100),
    occupation: Joi.string().required().min(1).max(100),
    AboutMe: Joi.string().required().min(1).max(500)
  });

  const updateUserSchema =Joi.object({
Name:Joi.string().required().min(1).max(50),
DisplayName: Joi.string().required().min(1).max(50),
email: Joi.string().required().email({ minDomainSegments: 2 }).max(100),
location: Joi.string().required().min(1).max(100)
  });

export  {updateContestantSchema,updateUserSchema};
