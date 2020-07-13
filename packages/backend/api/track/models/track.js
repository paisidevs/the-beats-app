"use strict";

const { getAudioDurationInSeconds } = require("get-audio-duration");

const getDuration = async (media) => {
  if (media) {
    const file = await strapi.plugins["upload"].services.upload.fetch({
      id: media,
    });

    try {
      const duration = await getAudioDurationInSeconds(
        "http://localhost:1337" + file.url
      );

      return Math.floor(duration);
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
    return 0;
  }
};

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    /**
     * Triggered before track creation.
     */
    async beforeCreate(data) {
      const { audio } = data;
      data.duration = await getDuration(audio);
    },
    /**
     * Triggered before track update.
     */
    async beforeUpdate(_params, data) {
      const { audio } = data;
      data.duration = await getDuration(audio);
    },
    /**
     * Triggered after track update.
     */
    async afterUpdate(data, _params) {
      const { album } = data;
      console.log({ album });
    },
  },
};
