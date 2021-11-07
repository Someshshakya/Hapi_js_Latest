"use strict";
const collectionName = "configuration";
const logger = require("../../utils/logger");
const db = require("../mongodb");

const postConfiguration = async (data) => {
  console.log(db.get(), "oka"); // trying to console db object it's comming null
  try {
    return await db.get().collection(collectionName).insert(data);
  } catch (error) {
    logger.error(error);
  }
};

const getConfigurationById = async (id) => {
  await db.get().collection(collectionName).findById(id); 
};

module.exports = {
  postConfiguration,
  getConfigurationById,
};
