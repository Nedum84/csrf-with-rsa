import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    NODE_ENV: Joi.string().default("development"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default Object.freeze({
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
});
