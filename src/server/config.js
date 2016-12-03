// USE dotenv to get config from file .env
import dotenv from 'dotenv';
// Parse env type
import dotenvParseVariables from 'dotenv-parse-variables';

const ENV = dotenvParseVariables(dotenv.config({}));

export default ENV;