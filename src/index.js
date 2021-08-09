import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'rsuite/lib/styles/themes/dark/index.less';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);
