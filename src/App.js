import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import useToken, { fakeAuth } from './components/auth';
import './styles/custom-theme.less';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';

function PrivateRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return fakeAuth.isAuthenticated === true ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

export default function App() {
	const { token, setToken } = useToken();

	return (
		<Router>
			<Route path='/login'>
				<LoginPage setToken={setToken} />
			</Route>
			<PrivateRoute path='/today'>
				<HomePage />
			</PrivateRoute>
		</Router>
	);
}
