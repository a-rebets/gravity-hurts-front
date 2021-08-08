import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	useLocation,
	useHistory,
} from 'react-router-dom';
import 'rsuite/lib/styles/index.less';
import { Button } from 'rsuite';

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100); // fake async
	},
};

const Public = (
	<div className='App'>
		<Button appearance='primary'> Hello world </Button>
	</div>
);
const Protected = () => <h3>Protected</h3>;

function Login() {
	const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

	const { state } = useLocation();

	const login = () =>
		fakeAuth.authenticate(() => {
			setRedirectToReferrer(true);
		});

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || '/'} />;
	}

	return (
		<div>
			<p>You must log in to view the page</p>
			<button onClick={login}>Log in</button>
		</div>
	);
}

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

function AuthButton() {
	const history = useHistory();

	return fakeAuth.isAuthenticated === true ? (
		<p>
			Welcome!{' '}
			<button
				onClick={() => {
					fakeAuth.signout(() => history.push('/'));
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	);
}

export default function App() {
	return (
		<Router>
			<div>
				<AuthButton />

				<ul>
					<li>
						<Link to='/public'>Public Page</Link>
					</li>
					<li>
						<Link to='/protected'>Protected Page</Link>
					</li>
				</ul>

				<Route path='/public'>
					<Public />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<PrivateRoute path='/protected'>
					<Protected />
				</PrivateRoute>
			</div>
		</Router>
	);
}
