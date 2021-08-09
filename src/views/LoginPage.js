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
	Input,
	Footer,
	Panel,
} from 'rsuite';
import { Redirect, useLocation } from 'react-router-dom';
import { fakeAuth } from '../components/auth';
import '../styles/login.less';
import LoginBlob from '../components/lognBlob';

const VALID_PASS = '111111';

const { addClass, hasClass, removeClass } = DOMHelper;

const LoginPage = () => {
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [pinValue, setpinValue] = useState('');

	const dotContainerRef = useRef(null);
	const wrapperRef = useRef(null);

	const { state } = useLocation();

	const login = () =>
		fakeAuth.authenticate(() => {
			setRedirectToReferrer(true);
		});

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
		<Container ref={wrapperRef} className='wrapper h-full'>
			<Header className='py-10 px-4'>
				<LoginBlob />
				<h1 className='z-10 relative ml-8 filter drop-shadow-md'>
					Введи
					<br />
					свой пароль
				</h1>
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
							<Form
								fluid
								onChange={(val) => {
									handlePinChange(val);
								}}
							>
								<FormGroup>
									<FormControl
										name='pin'
										accepter={Input}
										size='lg'
										type='number'
										inputMode='numeric'
										pattern='[0-9]*'
										value={pinValue}
									/>
								</FormGroup>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
			<Footer className='py-4 text-center'>
				<p>
					Made with ❤️ by <a href='https://github.com/apopelyshev'>Artem</a>
				</p>
			</Footer>
		</Container>
	);
};

export default LoginPage;
