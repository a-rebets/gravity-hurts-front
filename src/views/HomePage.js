import SwipeableViews from 'react-swipeable-views';
import HomeCountdown from '../components/home/HomeCountdown';
import HomeStart from '../components/home/HomeStart';
import '../styles/home.less';

const HomePage = () => {
	// drop(50, 100, 20, 0.04 + Math.random() * 0.04);

	return (
		<SwipeableViews resistance className='h-full'>
			<HomeStart />
			<HomeCountdown />
		</SwipeableViews>
	);
};

export default HomePage;
