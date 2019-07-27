import chai from 'chai';
import { describe } from 'mocha';
const { expect } = chai;

describe('config test',() => {
  describe('username map', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../src/config/config')]
      delete process.env.PLUGIN_USERNAME_MAP
      delete process.env.DRONE_COMMIT_AUTHOR
      process.env.PLUGIN_WEBHOOK = 'foo'
    })

    it('should map a username', () => {
      process.env.DRONE_COMMIT_AUTHOR = 'foo'
      process.env.PLUGIN_USERNAME_MAP = 'foo:bar'
      let config = require('../src/config/config');
      expect(config.commit.author).to.equal('bar')
    });

    it('should not map a username not mapped', () => {
      process.env.DRONE_COMMIT_AUTHOR = 'foo'
      process.env.PLUGIN_USERNAME_MAP = 'bar:baz'
      let config = require('../src/config/config');
      expect(config.commit.author).to.equal('foo')
    })

    it('should not map when no map is present', () => {
      process.env.DRONE_COMMIT_AUTHOR = 'foo'
      let config = require('../src/config/config');
      expect(config.commit.author).to.equal('foo')
    })
  });
});
