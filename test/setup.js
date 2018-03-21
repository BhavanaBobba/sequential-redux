import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'sinon-as-promised';
import {jsdom} from 'jsdom'

// example of using the should DSL without having to import it anywhere
// see chai docs
global.should = chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);
global.sinon = sinon;

// mocha re-executes every time so we need to create this lazily
if (!global.document) {
    global.document = jsdom('<html><head></head><body></body></html>');
    global.window = document.defaultView;
    global.navigator = window.navigator;
}