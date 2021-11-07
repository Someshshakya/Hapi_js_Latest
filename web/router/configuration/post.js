const Joi = require("joi");
const configuration = require("../../../models/mobile/configuration");
// validator for configuration input
//prettier-ignore
const validateConfigration = {payload: Joi.object({
    modelName: Joi.string().required().description('mandotry field for ModelName'),
    wirelessCarrier: Joi.string().description("Optional field for wirelessCarrier"),
    brand: Joi.string().required().description("mandotory field for brand"),
    memoryStorage: Joi.string().required().description("mandotory field for memoryStorage"),
    ram: Joi.string().required().description("mandotory field for ram"),
  })
};

// handler for configuration post
const postConfighandler = async (req, res) => {
  let inputConfigData = {
    modelName: req.payload.modelName,
    wirelessCarrier: req.payload.wirelessCarrier,
    brand: req.payload.brand,
    memoryStorage: req.payload.memoryStorage,
    ram: req.payload.ram,
    releaseDate: new Date("Jan 25 2015"),
  };
  try {
    const data = await configuration.postConfiguration(inputConfigData);
    console.log(data, "this is the data ");
    return res
      .response({
        message: "New configuration Posted Successfully !",
        data: {
          status: true,
        },
      })
      .code(500);
  } catch (error) {
    return res
      .response({
        message: `Error while posting configuration, ${error}`,
        data: {
          status: false,
        },
      })
      .code(500);
  }
};

module.exports = {
  validateConfigration,
  postConfighandler,
};
// options: {
// validate: {
//     payload: Joi.object({
//         post: Joi.string().min(1).max(140),
//         date: Joi.date().required()
//     })
// }
