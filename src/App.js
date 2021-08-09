import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import { fakeAuth } from './components/auth';

const Protected = () => <h3>Protected</h3>;

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
	return (
		<Router>
			<Route path='/login'>
				<LoginPage />
			</Route>
			<PrivateRoute path='/protected'>
				<Protected />
			</PrivateRoute>
		</Router>
	);
}
