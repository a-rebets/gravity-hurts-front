import {
	Badge,
	FlexboxGrid,
	Container,
	Header,
	Icon,
	IconButton,
	Content,
	Footer,
} from 'rsuite';
import WaterWave from 'react-water-wave';
import waterLayerBg from '../../assets/bg.jpg';
import { memo, useEffect, useState } from 'react';
import Player from '../player/Player';

import StoryImage from '../story/StoryImage';

import testImg from '../../assets/krakow.jpeg';

const WaterSwitch = ({
	waterEffectCallback,
	waterActive,
	globalModalBlocking,
	drawerShown,
}) => {
	useEffect(() => {
		if ((globalModalBlocking && waterActive) || (drawerShown && waterActive)) {
			waterEffectCallback.pause();
		}
		if (!globalModalBlocking && !drawerShown && !waterActive) {
			waterEffectCallback.play();
		}
	}, [waterActive, drawerShown, waterEffectCallback, globalModalBlocking]);

	return <></>;
};

const HomeStart = memo(({ drawer, globalModal, story }) => {
	const [waterActive, setwaterActive] = useState(true);

	const toggleStory = () => {
		globalModal.setBlocking(true);
		story.setShown(true);
	};

	const openDrawer = () => drawer.setShown(true);

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
						<Header className='mt-12'>
							<FlexboxGrid>
								<FlexboxGrid.Item className='bg-gray-600 bg-opacity-80 pl-6 pr-4'>
									<h3 className='greeting'>Привет, Поля</h3>
									<h3 className='inline-block'>&nbsp;😊</h3>
								</FlexboxGrid.Item>
							</FlexboxGrid>
							<FlexboxGrid
								align='middle'
								justify='space-between'
								className='toolbar'
							>
								<FlexboxGrid.Item className='px-6'>
									<Player setModalBlock={globalModal.setBlocking} />
								</FlexboxGrid.Item>
								<FlexboxGrid.Item className='pr-6'>
									<Badge content={2}>
										<IconButton
											onClick={openDrawer}
											size='lg'
											appearance='primary'
											icon={<Icon icon='bell' />}
										/>
									</Badge>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</Header>
						<Content></Content>
						<Footer className='flex justify-center p-6 relative'>
							<div id='circle'>
								<IconButton
									appearance='ghost'
									size='lg'
									circle
									icon={<Icon icon='file-text' />}
									onClick={toggleStory}
								/>
							</div>
						</Footer>
						{story.shown && <StoryImage source={testImg} />}
						<WaterSwitch
							waterEffectCallback={waterCallbacks}
							drawerShown={drawer.shown}
							globalModalBlocking={globalModal.blocking}
							waterActive={waterActive}
						/>
					</Container>
				);
			}}
		</WaterWave>
	);
});

export default HomeStart;
