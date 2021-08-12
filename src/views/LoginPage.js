import { useRef, useState } from 'react';
import {
	DOMHelper,
	Container,
	Header,
	Content,
	FlexboxGrid,
	Form,
	FormGroup,
	FormControl,
	InputNumber,
	Footer,
	Panel,
} from 'rsuite';
import { Redirect, useLocation } from 'react-router-dom';
import { fakeAuth } from '../components/auth';
import '../styles/login.less';
import LoginBlob from '../components/lognBlob';

const VALID_PASS = '111111';

const { addClass, hasClass, removeClass } = DOMHelper;

async function loginUser(credentials) {
	return fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

const LoginPage = ({ setToken }) => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [pinValue, setpinValue] = useState('');

	const dotContainerRef = useRef(null);

	const { state } = useLocation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			user: process.ENV.APP_USER,
			password: pinValue,
		});
		setToken(token);
		setRedirectToReferrer(true);
	};

	const validatePin = (val) => {
		if (val === VALID_PASS) {
			updateElements('correct');
		} else {
			updateElements('wrong');
		}
	};

	const updateElements = (classname) => {
		document.body.classList.add(classname);
		for (const el of getChildren(dotContainerRef)) {
			addClass(el, classname);
		}
		setTimeout(() => resetElements(classname), 1200);
	};

	const resetElements = (classname) => {
		setpinValue('');
		document.body.classList.remove(classname);
		for (const el of getChildren(dotContainerRef)) {
			removeClass(el, classname);
			removeClass(el, 'active');
		}
	};

	const handlePinChange = ({ pin }) => {
		setpinValue(pin);
		for (const [index, el] of getChildren(dotContainerRef).entries()) {
			if (index + 1 <= pin.length) {
				if (!hasClass(el, 'active')) {
					addClass(el, 'active');
				}
			} else {
				if (hasClass(el, 'active')) {
					removeClass(el, 'active');
				}
			}
		}
		if (pin.length === 6) {
			setTimeout(() => validatePin(pin), 300);
		}
	};

	const getChildren = (ref) => Array.from(ref.current.children);

	if (redirectToReferrer === true) {
		return <Redirect to={state?.from || '/'} />;
	}

	return (
		<Container className='h-full'>
			<Header className='py-10 px-4'>
				<LoginBlob />
				<h1 className='login-title'>Введи</h1>
				<h1 className='login-title'>свой пароль</h1>
			</Header>
			<Content>
				<FlexboxGrid justify='center' className='py-4'>
					<FlexboxGrid.Item colspan={18}>
						<Panel>
							<div className='dots' ref={dotContainerRef}>
								{[...Array(6)].map((e, i) => (
									<div className='dot' key={i}></div>
								))}
							</div>
							<p className='text-center pt-7 pb-3'>
								<em>Нажать ниже для ввода</em>
							</p>
							<Form
								fluid
								onChange={(val) => {
									handlePinChange(val);
								}}
							>
								<FormGroup>
									<FormControl
										name='pin'
										accepter={InputNumber}
										pattern='[0-9]*'
										value={pinValue}
									/>
								</FormGroup>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
			<Footer className='py-5 text-center'>
				<p>
					Made with ❤️ by <a href='https://github.com/apopelyshev'>Artem</a>
				</p>
			</Footer>
		</Container>
	);
};

export default LoginPage;
