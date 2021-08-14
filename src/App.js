import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import useToken from './components/util/auth';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';

function PrivateRoute({ children, token, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return token ? (
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
			<PrivateRoute token={token} path='/today'>
				<HomePage />
			</PrivateRoute>
		</Router>
	);
}
