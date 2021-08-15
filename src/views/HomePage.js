import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Carousel } from 'rsuite';
import HomeCountdown from '../components/home/HomeCountdown';
import HomeStart from '../components/home/HomeStart';
import NotificationDrawer from '../components/home/NotificationDrawer';
import '../styles/home.less';

import StoryImage from '../components/story/StoryImage';

import testImg from '../assets/krakow.jpeg';

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

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => switchCarousel(pageStates[1]),
		onSwipedRight: () => switchCarousel(pageStates[0]),
		...swipeConfig,
	});

	const drawerSwipeHandlers = useSwipeable({
		onSwipedLeft: () => toggleDrawer(),
		...swipeConfig,
	});

	const toggleDrawer = () => setdrawerShown(!drawerShown);

	return (
		<>
			<div {...swipeHandlers} className='swipe-provider h-full'>
				<Carousel ref={carouselRef} placement='top' shape='bar'>
					<HomeStart key={1} drawerCallback={toggleDrawer} />
					<HomeCountdown key={2} />
				</Carousel>
			</div>
			<StoryImage source={testImg} />
			<NotificationDrawer
				swipeHandlers={drawerSwipeHandlers}
				shown={drawerShown}
				callback={toggleDrawer}
			/>
		</>
	);
};

export default HomePage;
