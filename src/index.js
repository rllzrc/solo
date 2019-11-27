import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux;
import App from './components/App';
// import store from './store';
// import styles from './scss/applicaiton.scss';


// * need to tell React app where to hook into the DOM (in our index.html)
// * this will tell React what to render and where to render it
// * here we are rendering a component called App
// * being rendered at the DOM element w the id 'root'
// render(
//     <App />,
//   document.getElementById('root')
// );

ReactDOM.render(<App />, document.getElementById('root'));
