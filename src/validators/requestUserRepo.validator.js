const Ajv = require('ajv');
const ajv = new Ajv({errorDataPath: 'property'});

/**
 * Method to validate params request data with user and repository
 * @param {Object} data data for validation
 * @throws {Error} error specifying if field required (required-field) ou invalid (type-field)
 * @returns {boolean} true
 */
const validator = async (data) => {
    // schema to validate user and repoId
    const schema = {
        properties: {
            user: { type: "string" },
            repoId: { type: "string" }
        },
        required: ["user", "repoId"]
    }

    // get he result of validation
    const valid = await ajv.validate(schema, data);

    // if data is not valid, set the correct message to return
    if (!valid) {
        // set the error type according keyword and dataPath
        const errorType = `${ajv.errors[0].keyword}-${ajv.errors[0].dataPath.substr(1)}`;

        // throw an error with defined type
        throw new Error(errorType);
    } else {
        // if valid, return true
        return true;
    }
}

module.exports = { requestUserRepoValidator: validator };