'use strict';

/**
 * ii service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ii.ii');
