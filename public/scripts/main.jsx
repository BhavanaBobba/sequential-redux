if (typeof Promise !== "function") {
    require("es6-promise").polyfill();
}
let React = require("react");
let ReactDOM = require("react-dom");
import {Router, browserHistory} from 'react-router';
import moment from 'moment';
import routes from './components/routes';
import packageJson from '../../package.json';

const routerElement = (
      <Router routes={routes} history={browserHistory}/>
    );
ReactDOM.render(routerElement, document.querySelector('.contents'));
