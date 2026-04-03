/*
 * Get all enabled languages
 */

const { PREFIXES } = require('@medic/constants');

angular.module('inboxServices').factory('Languages',
  function(
    DB
  ) {
    'use strict';
    'ngInject';
    return function() {
      return DB()
        .allDocs({ start_key: PREFIXES.TRANSLATIONS, end_key: PREFIXES.TRANSLATIONS + '\ufff0', include_docs: true })
        .then(function(result) {
          return result.rows.map(row => ({ code: row.doc.code, name: row.doc.name }));
        });
    };
  });
