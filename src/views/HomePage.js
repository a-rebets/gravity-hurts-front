import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Carousel } from 'rsuite';
import HomeCountdown from '../components/home/HomeCountdown';
import HomeStart from '../components/home/HomeStart';
import NotificationDrawer from '../components/home/NotificationDrawer';
import '../styles/home.less';

const swipeConfig = {
	delta: 150,
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
	const [drawerShown, setdrawerShown] = useState(false);

	const switchCarousel = (state) => carouselRef.current.setState(state);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (drawerShown) {
				toggleDrawer();
			} else {
				switchCarousel(pageStates[1]);
			}
		},
		onSwipedRight: () => switchCarousel(pageStates[0]),
		...swipeConfig,
	});

	const toggleDrawer = () => setdrawerShown(!drawerShown);

	return (
		<div {...handlers} className='swipe-provider h-full'>
			<Carousel ref={carouselRef} placement='top' shape='bar'>
				<HomeStart key={1} drawerCallback={toggleDrawer} />
				<HomeCountdown key={2} />
			</Carousel>
			<NotificationDrawer shown={drawerShown} callback={toggleDrawer} />
		</div>
	);
};

export default HomePage;
