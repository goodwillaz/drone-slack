import axios from 'axios';
import chai from 'chai';
import spies from 'chai-spies';
import fs from 'fs';
import { describe } from 'mocha';
import Renderer from '../src/lib/renderer';

chai.use(spies);

const { expect, spy } = chai;
const sandbox = spy.sandbox();

describe('Renderer test', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('return the same template passed in', async () => {
        const renderer = new Renderer('foo');
        const template = await renderer.getTemplate();
        expect(template).to.equal('foo');
    });

    it('returns a web-based template', async () => {
        sandbox.on(axios, 'get', returns => 'bar');

        const renderer = new Renderer('http://foo');
        const template = await renderer.getTemplate();

        expect(axios.get).to.be.called.once.with('http://foo');
        expect(template).to.equal('bar');
    });

    it('returns original template due to http failure', async () => {
        sandbox.on(axios, 'get', returns => Promise.reject('File not found'));

        const renderer = new Renderer('http://foo');
        const template = await renderer.getTemplate();

        expect(axios.get).to.be.called.once.with('http://foo');
        expect(template).to.equal('http://foo');
    });

    it('returns a file-based template', async () => {
        sandbox.on(fs, 'readFileSync', returns => 'bar');

        const renderer = new Renderer('file:///foo');
        const template = await renderer.getTemplate();

        expect(fs.readFileSync).to.be.called.once.with('/foo');
        expect(template).to.equal('bar');
    });

    it('returns a original template due to file read error', async () => {
        sandbox.on(fs, 'readFileSync', returns => {
            throw new Error('file not found')
        });

        const renderer = new Renderer('file:///foo');
        const template = await renderer.getTemplate();

        expect(fs.readFileSync).to.be.called.once.with('/foo');
        expect(template).to.equal('file:///foo');
    });

    it('renders a template', async () => {
        const renderer = new Renderer('Name: {{name}}');
        const rendered = await renderer.render({name: 'foo'});

        expect(rendered).to.equal('Name: foo');
    });
});
