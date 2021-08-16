import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Carousel } from 'rsuite';
import HomeCountdown from '../components/home/HomeCountdown';
import HomeStart from '../components/home/HomeStart';
import NotificationDrawer from '../components/home/NotificationDrawer';
import '../styles/home.less';

const swipeConfig = {
	delta: 250,
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
	const [modalBlocking, setmodalBlocking] = useState(false);

	const switchCarousel = (state) => carouselRef.current.setState(state);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => {
			if (!modalBlocking) {
				switchCarousel(pageStates[1]);
			}
		},
		onSwipedRight: () => {
			if (!modalBlocking) {
				switchCarousel(pageStates[0]);
			}
		},
		...swipeConfig,
	});

	const drawerSwipeHandlers = useSwipeable({
		onSwipedLeft: () => setdrawerShown(false),
		...{ ...swipeConfig, delta: 100 },
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
						drawer={{ shown: drawerShown, setShown: setdrawerShown }}
						globalModal={{
							blocking: modalBlocking,
							setBlocking: setmodalBlocking,
						}}
						story={{ shown: storyShown, setShown: setstoryShown }}
					/>
					<HomeCountdown key={2} />
				</Carousel>
			</div>
			<NotificationDrawer
				swipeHandlers={drawerSwipeHandlers}
				shown={drawerShown}
				callback={() => setdrawerShown(false)}
			/>
		</>
	);
};

export default HomePage;
