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
	const [storyShown, setstoryShown] = useState(false);

	const switchCarousel = (state) => carouselRef.current.setState(state);
	const toggleDrawer = () => setdrawerShown(!drawerShown);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => switchCarousel(pageStates[1]),
		onSwipedRight: () => switchCarousel(pageStates[0]),
		...swipeConfig,
	});

	const drawerSwipeHandlers = useSwipeable({
		onSwipedLeft: () => toggleDrawer(),
		...swipeConfig,
	});

	return (
		<>
			<div {...swipeHandlers} className='swipe-provider h-full'>
				<Carousel
					ref={carouselRef}
					placement='top'
					shape='bar'
					className={storyShown ? 'story-open' : ''}
				>
					<HomeStart
						key={1}
						drawerCallback={toggleDrawer}
						story={{ shown: storyShown, setShown: setstoryShown }}
					/>
					<HomeCountdown key={2} />
				</Carousel>
			</div>
			<NotificationDrawer
				swipeHandlers={drawerSwipeHandlers}
				shown={drawerShown}
				callback={toggleDrawer}
			/>
		</>
	);
};

export default HomePage;
