"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

/**
 * Removes all special characters from a string.
 * @param str string
 */
const stripSpecialCharacters = (str) => {
  return str.replace(/[^a-zA-Z\d]/g, "");
};

/**
 * Generates an alias
 * @param str string
 */
const generateAlias = (str, options = {}) => {
  const { prefix, suffix } = options;
  const formattedString = stripSpecialCharacters(str).toLowerCase().trim();
  let alias = formattedString;

  if (prefix && suffix) {
    alias = `${prefix}:${formattedString}:${suffix}`;
  } else if (prefix) {
    alias = `${prefix}:${formattedString}`;
  } else if (suffix) {
    alias = `${formattedString}:${suffix}`;
  }

  return alias;
};

module.exports = {
  lifecycles: {
    /**
     * Triggered before artist creation.
     */
    async beforeCreate(data) {
      data.alias = generateAlias(data.name);
    },
    /**
     * Triggered before artist update.
     */
    async beforeUpdate(_params, data) {
      data.alias = generateAlias(data.name);
    },
  },
};
