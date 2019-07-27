import chai from 'chai';
import spies from 'chai-spies';
import { describe } from 'mocha';
import * as helpers from '../src/lib/template-helpers';

chai.use(spies);

const { expect } = chai;

describe('helpers test',() => {
    describe('duration function', () => {
        it('should print out seconds', () => {
            const duration = helpers.duration(0, 10);
            expect(duration).to.equal('10 seconds');
        });

        it('should print out minutes and seconds', () => {
            const duration = helpers.duration(0, 100);
            expect(duration).to.equal('1 minute, 40 seconds');
        })
    });

    describe('datetime function', () => {
        const timestamp = 1546326000;

        it('should use the default format', () => {
            const datetime = helpers.datetime(timestamp);
            expect(datetime).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}/);
        });

        it('should format the date with a custom format', () => {
            const datetime = helpers.datetime(timestamp, 'MMMM Do, YYYY');
            expect(datetime).to.equal('January 1st, 2019');
        });

        it('should use a different timezone', () => {
            const datetime = helpers.datetime(timestamp, null, 'UTC');
            expect(datetime).to.equal('2019-01-01T07:00:00Z');
        });

        it('should use local time when timezone is invalid', () => {
            const datetime = helpers.datetime(timestamp, 'z', 'Foo');
            expect(datetime).not.to.equal('Foo');
        });

        it('should not fail with an object as the zone', () => {
            const datetime = helpers.datetime(timestamp, 'MMMM Do, YYYY', {foo: 'foo'});
            expect(datetime).to.equal('January 1st, 2019');
        });
    });

    describe('success function', () => {
        let options = {};

        beforeEach(() => {
            options = {
                fn: chai.spy(),
                inverse: chai.spy(),
            }
        });

        it('should call inverse when no parameters', () => {
            helpers.success(undefined, options);
            expect(options.fn).to.not.have.been.called();
            expect(options.inverse).to.have.been.called();
        });

        it('should call fn when success', () => {
            helpers.success('success', options);
            expect(options.fn).to.have.been.called();
            expect(options.inverse).to.not.have.been.called();
        });

        it('should call inverse when not success', () => {
            helpers.success('failure', options);
            expect(options.fn).to.not.have.been.called();
            expect(options.inverse).to.have.been.called();
        });
    });

    describe('failure function', () => {
        let options = {};

        beforeEach(() => {
            options = {
                fn: chai.spy(),
                inverse: chai.spy(),
            }
        });

        it('should call inverse when no parameters', () => {
            helpers.failure(undefined, options);
            expect(options.fn).to.not.have.been.called();
            expect(options.inverse).to.have.been.called();
        });

        it('should call fn when failure', () => {
            helpers.failure('failure', options);
            expect(options.fn).to.have.been.called();
            expect(options.inverse).to.not.have.been.called();
        });

        it('should call fn when error', () => {
            helpers.failure('error', options);
            expect(options.fn).to.have.been.called();
            expect(options.inverse).to.not.have.been.called();
        });

        it('should call fn when killed', () => {
            helpers.failure('killed', options);
            expect(options.fn).to.have.been.called();
            expect(options.inverse).to.not.have.been.called();
        });

        it('should call inverse when anything else', () => {
            helpers.failure('success', options);
            expect(options.fn).to.not.have.been.called();
            expect(options.inverse).to.have.been.called();
        });
    });

    describe('since function', () => {
        afterEach(() => {
            chai.spy.restore(Date);
        });

        it('should humanize time since', () => {
            chai.spy.on(Date, 'now', returns => 1546326000000);
            const since = helpers.since(1546326010);
            expect(since).to.equal('10 seconds');
        });
    });

    describe('regexReplace function', () => {
        it('should use regex to replace in a string', () => {
            const replaced = helpers.regexReplace('a+', 'faa bar', 'oo');
            expect(replaced).to.equal('foo boor');
        });
    });

    describe('substring function', () => {
        it('should produce a valid substring', () => {
            const substring = helpers.substring('foo', 0, 1);
            expect(substring).to.equal('f');
        });

        it('should work with an undefined end', () => {
            const substring = helpers.substring('foo', 1);
            expect(substring).to.equal('oo');
        });
    });
});
