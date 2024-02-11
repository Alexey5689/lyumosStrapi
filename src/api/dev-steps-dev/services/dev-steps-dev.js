'use strict';

/**
 * dev-steps-dev service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dev-steps-dev.dev-steps-dev');
