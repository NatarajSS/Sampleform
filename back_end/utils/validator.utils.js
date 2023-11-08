const Joi = require("joi");
const stringWithSpace = /^(?![\s-])[\w\s-]+$/;
const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
const phonePattern = /^\d{10}$/;
const stringAllowSpecial = /^[a-zA-Z0-9][a-zA-Z0-9\s!-\/:-@*()[-`{-~]*$/;
const stringWithoutSpace = /^\S+$/;
const pathPattern = /^([\/]{1}[a-z0-9.]+)+(\/?){1}$|^([\/]{1})$/;
const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const registerSchema = Joi.object().keys({
  first_name: Joi.string().pattern(stringWithSpace).required().messages({
    "string.pattern.base": "Firse name must be an valid string.",
  }),
  last_name: Joi.string().pattern(stringWithSpace).required().messages({
    "string.pattern.base": "Last name must be an valid string.",
  }),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters.",
  }),
  phone: Joi.string().required(),  
  user_type: Joi.string().optional(),
  gender: Joi.string().required(),  
  confirmed: Joi.boolean().optional(),  
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const confirmSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .regex(/^[0-9]{6}$/)
    .messages({ "string.pattern.base": `OTP must have 6 digits only.` })
    .required(),
});

const emailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  wallet_address: Joi.string().optional(),
});

const verifyOtpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .regex(/^[0-9]{6}$/)
    .messages({ "string.pattern.base": `OTP must have 6 digits only.` })
    .required(),
});

const resetPasswordSchema = Joi.object().keys({
  hash: Joi.string().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters.",
  }),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const changePasswordSchema = Joi.object().keys({
  old_password: Joi.string().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters.",
  }),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const uploadUserSchema = Joi.array().items(registerSchema);

const businessSchema = Joi.object().keys({
  user: Joi.string().optional(),
  email: Joi.string().optional(),
  business_name: Joi.string().required().pattern(stringAllowSpecial).messages({
    "string.pattern.base": "Business name must be valid.",
  }),
  location: Joi.string().required().pattern(stringWithSpace).messages({
    "string.pattern.base": "Enter valid location.",
  }),
  primary_contact: Joi.string().required(),
  country_code: Joi.string().required(),
  ftp_location: Joi.string().required().pattern(pathPattern).messages({
    "string.pattern.base": "Enter valid ftp location.",
  }),
  ftp_username: Joi.string().required().pattern(stringWithSpace).messages({
    "string.pattern.base": "Enter valid ftp username.",
  }),
  ftp_password: Joi.string().required().pattern(stringAllowSpecial).messages({
    "string.pattern.base": "Enter valid ftp password.",
  }),
  ftp_domain: Joi.string().required().pattern(stringWithoutSpace).messages({
    "string.pattern.base": "Enter valid ftp domain.",
  }),
});

const updateUserSchema = Joi.object().keys({
  first_name: Joi.string().pattern(stringWithSpace).required().messages({
    "string.pattern.base": "Name must be an valid string.",
  }),
  last_name: Joi.string().pattern(stringWithSpace).required().messages({
    "string.pattern.base": "Name must be an valid string.",
  }),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
});

const updateOuraSchema = Joi.object().keys({
  ouraring_key: Joi.string().required(),
});

const getBusinessSchema = Joi.object().keys({
  user: Joi.string().required(),
});

const createAppSchema = Joi.object().keys({
  app_name: Joi.string().required().pattern(stringWithoutSpace).messages({
    "string.pattern.base": "App name must be an valid string without spaces.",
  }),
  app: Joi.string().required().pattern(stringWithSpace).messages({
    "string.pattern.base": "Last name must be an valid string.",
  }),
});

const editAppSchema = Joi.object().keys({
  app_name: Joi.string().pattern(stringWithoutSpace).optional().messages({
    "string.pattern.base": "App name must be an valid string without spaces.",
  }),
  app: Joi.string().optional().pattern(stringWithSpace).messages({
    "string.pattern.base": "Last name must be an valid string.",
  }),
});

const optAppSchema = Joi.object().keys({
  opt: Joi.boolean().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  confirmSchema,
  emailSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  changePasswordSchema,
  uploadUserSchema,
  businessSchema,
  getBusinessSchema,
  updateUserSchema,
  createAppSchema,
  optAppSchema,
  editAppSchema,
  updateOuraSchema,
};
