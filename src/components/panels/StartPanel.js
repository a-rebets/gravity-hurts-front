import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react';
import { Container, Icon, IconButton, Content, Footer } from 'rsuite';
import { useSwipeable } from 'react-swipeable';
import WaterWave from 'react-water-wave';
import StartPanelHeader from './StartPanelHeader';

import waterLayerBg from '../../assets/bg.jpg';
import '../../styles/panels/start.less';

const StoryImage = lazy(() => import('../story/StoryImage'));
const NotificationDrawer = lazy(() => import('../util/drawer'));

const WaterSwitch = ({
	waterEffectCallback,
	waterActive,
	globalModalBlocking,
}) => {
	useEffect(() => {
		if (globalModalBlocking && waterActive) {
			waterEffectCallback.pause();
		} else if (!globalModalBlocking && !waterActive) {
			waterEffectCallback.play();
		}
	}, [waterActive, waterEffectCallback, globalModalBlocking]);

	return <></>;
};

const drawerSwipeConfig = {
	delta: 100,
	trackTouch: true,
	trackMouse: true,
};

const headerGreeting = (
	<>
		<h4 className='greeting'>Привет, Поля</h4>
		<h4 className='inline-block'>&nbsp;😊</h4>
	</>
);

const Start = memo(({ globalModalBlocking, setGlobalModalBlocking, story }) => {
	const [waterActive, setwaterActive] = useState(true);
	const [drawerShown, setdrawerShown] = useState(false);
	const [storyLoaded, setstoryLoaded] = useState(false);

	const openDrawer = useCallback(() => {
		setdrawerShown(true);
		setGlobalModalBlocking(true);
	}, [setGlobalModalBlocking]);

	const toggleStory = useCallback(() => {
		story.setShown(!story.shown);
		setGlobalModalBlocking(!story.shown);
	}, [story, setGlobalModalBlocking]);

	const drawerSwipeHandlers = useSwipeable({
		onSwipedLeft: () => setdrawerShown(false),
		...drawerSwipeConfig,
	});

	const getWaterCallbacks = (obj) => ({
		play: () => {
			setwaterActive(true);
			obj.play();
		},
		pause: () => {
			setwaterActive(false);
			obj.pause();
		},
	});

	return (
		<WaterWave
			className='water-layer rs-carousel-slider-item'
			imageUrl={waterLayerBg}
		>
			{({ pause, play }) => {
				const waterCallbacks = getWaterCallbacks({ play, pause });
				return (
					<Container className='wrapper'>
						<StartPanelHeader
							greeting={headerGreeting}
							setModalBlock={setGlobalModalBlocking}
							drawerCallback={openDrawer}
						/>
						<Content></Content>
						<Footer className='flex justify-center p-6 relative'>
							<div id='circle'>
								<IconButton
									appearance='ghost'
									circle
									icon={<Icon icon='file-text' />}
									onClick={toggleStory}
									disabled={!storyLoaded}
								/>
							</div>
						</Footer>
						<Suspense fallback={<></>}>
							<StoryImage
								source={
									'https://www.xtrafondos.com/wallpapers/vertical/espacio-estrellas-universo-nebulosa-3337.jpg'
								}
								setLoadedCallback={setstoryLoaded}
							/>
						</Suspense>
						<WaterSwitch
							waterEffectCallback={waterCallbacks}
							globalModalBlocking={globalModalBlocking}
							waterActive={waterActive}
						/>
						<Suspense fallback={<></>}>
							<NotificationDrawer
								swipeHandlers={drawerSwipeHandlers}
								shown={drawerShown}
								closeCallback={() => {
									setdrawerShown(false);
								}}
								modalCallback={() => {
									setGlobalModalBlocking(false);
								}}
							/>
						</Suspense>
					</Container>
				);
			}}
		</WaterWave>
	);
});

export default Start;
