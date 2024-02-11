'use strict';

/**
 * dev-case service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dev-case.dev-case');
