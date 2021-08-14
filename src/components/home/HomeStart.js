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
import { memo, useRef } from 'react';
import Player from '../player/Player';

const HomeStart = memo(({ drawerCallback }) => {
	const storyCircleRef = useRef(null);

	const handleStoryBtnClick = () => {
		storyCircleRef.current.classList.toggle('clicked');
	};

	return (
		<WaterWave
			className='water-layer rs-carousel-slider-item'
			imageUrl={waterLayerBg}
		>
			{(_) => (
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
								<Player />
							</FlexboxGrid.Item>
							<FlexboxGrid.Item className='pr-6'>
								<Badge content={2}>
									<IconButton
										onClick={drawerCallback}
										size='lg'
										appearance='primary'
										icon={<Icon icon='bell' />}
									/>
								</Badge>
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</Header>
					<Content></Content>
					<Footer className='flex justify-center p-6 z-0 relative'>
						<div ref={storyCircleRef} id='circle'>
							<IconButton
								appearance='ghost'
								size='lg'
								circle
								icon={<Icon icon='file-text' />}
								onClick={handleStoryBtnClick}
							/>
						</div>
					</Footer>
				</Container>
			)}
		</WaterWave>
	);
});

export default HomeStart;
