import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);
