import { useEffect, useState } from 'react';
import { Panel } from 'rsuite';

const Timer = () => {
	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});

	const timerComponents = [];

	const calculateTimeLeft = () => {
		const difference = +new Date('2022-02-15T19:00:00') - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				h: Math.floor((difference / (1000 * 60 * 60)) % 24),
				m: Math.floor((difference / 1000 / 60) % 60),
				s: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<>
				<span className='text-2xl font-bold px-1'>{timeLeft[interval]}</span>
				<span>{interval} </span>
			</>
		);
	});

	return timerComponents.length ? (
		<Panel className='text-center'>
			<p className='text-center pb-3 text-base'>Заходи сюда через:</p>
			{timerComponents}
		</Panel>
	) : (
		<span>Ready!</span>
	);
};

export default Timer;
