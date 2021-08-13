import { useEffect, useState } from 'react';
import { Grid, Row, Col, FlexboxGrid } from 'rsuite';

const localized = {
	days: {
		1: 'день',
		4: 'дня',
		9: 'дней',
	},
	hours: {
		1: 'час',
		4: 'часа',
		9: 'часов',
	},
	minutes: {
		1: 'минута',
		4: 'минуты',
		9: 'минут',
	},
	seconds: {
		1: 'секунда',
		4: 'секунды',
		9: 'секунд',
	},
};

const Countdown = ({ digitSpan, textSpan }) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(`2021-09-12`) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}
		return parseLocal(timeLeft);
	};

	const parseLocal = (obj) => {
		let res = {};
		for (const [key, value] of Object.entries(obj)) {
			if ((value >= 11 && value < 20) || value % 10 === 0) {
				res[localized[key][9]] = value;
				continue;
			}
			let temp = Object.entries(localized[key]).filter(
				([localKey, _]) => value % 10 <= parseInt(localKey)
			)[0];
			res[temp[1]] = value;
		}
		return res;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const timerComponents = [];

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});

	Object.keys(timeLeft).forEach((interval, ind) => {
		timerComponents.push(
			<Row key={`countdown-row-${ind}`}>
				<Col xs={24}>
					<FlexboxGrid align='bottom'>
						<FlexboxGrid.Item colspan={digitSpan}>
							<p>{timeLeft[interval]}</p>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item colspan={textSpan}>
							<p>{interval}</p>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Col>
			</Row>
		);
	});

	return (
		<Grid fluid className='countdown'>
			{timerComponents}
		</Grid>
	);
};

export default Countdown;
