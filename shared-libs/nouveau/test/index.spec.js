const expect = require('chai').expect;

const lib = require('../src/index');
const { PREFIXES } = require('@medic/constants');

describe('nouveau utils', () => {
  it('should return limits', () => {
    expect(lib.BATCH_LIMIT).to.equal(1000);
    expect(lib.RESULTS_LIMIT).to.equal(200000);
  });

  describe('escaping special characters', () => {
    [ '+', '-', '&', '|', '!', '^', '"', '~', '*', '?', ':', '[', ']' ].forEach(specialChar => {
      it(`should escape ${specialChar}`, () => {
        expect(lib.escapeKeys(`a${specialChar}string`)).to.equal(`a\\${specialChar}string`);
      });
    });

    it('should escape a uuid', () => {
      expect(lib.escapeKeys('a-uuid-string')).to.equal('a\\-uuid\\-string');
    });

    it('should escape a user name', () => {
      const userId = PREFIXES.COUCH_USER + 'fixture.user.test';
      expect(lib.escapeKeys(userId))
        .to.equal(userId.replace(/:/g, '\\:'));
    });

    it('should escape a task uuid', () => {
      const taskId = [
        'task~',
        PREFIXES.COUCH_USER,
        '48_tam~0f335495-cc71-43a5-a3d0-0e1b32d54c8e~',
        'commodities-stock-out~cha-commodity-stock-out~1723279828121'
      ].join('');

      expect(lib.escapeKeys(taskId)).to.equal(
        taskId
          .replace(/~/g, '\\~')
          .replace(/:/g, '\\:')
          .replace(/-/g, '\\-')
      );
    });
  });
});
