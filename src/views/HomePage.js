import { useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Carousel, Alert } from 'rsuite';
import HomeCountdown from '../components/home/HomeCountdown';
import HomeStart from '../components/home/HomeStart';
import '../styles/home.less';

const swipeConfig = {
	preventDefaultTouchmoveEvent: true,
	trackTouch: true,
	trackMouse: true,
};
const pageStates = [
	{ activeIndex: 0, lastIndex: 0 },
	{ activeIndex: 1, lastIndex: 1 },
];

const HomePage = () => {
	const carouselRef = useRef(null);

	const switchCarousel = (state) => carouselRef.current.setState(state);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			Alert.info('You swiped left!');
			switchCarousel(pageStates[1]);
		},
		onSwipedRight: () => switchCarousel(pageStates[0]),
		...swipeConfig,
	});
	// drop(50, 100, 20, 0.04 + Math.random() * 0.04);

	return (
		<div {...handlers} class='swipe-provider h-full'>
			<Carousel ref={carouselRef} placement='top' shape='bar'>
				<HomeStart />
				<HomeCountdown />
			</Carousel>
		</div>
	);
};

export default HomePage;
