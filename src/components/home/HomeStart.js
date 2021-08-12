import {
	ButtonToolbar,
	Container,
	Header,
	Icon,
	IconButton,
	Content,
	Footer,
} from 'rsuite';
import WaterWave from 'react-water-wave';
import waterLayerBg from '../../assets/bg.jpg';
import { useRef } from 'react';

const HomeStart = () => {
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
					<Header>
						<h3 className='bg-gray-800 inline-block mt-10 py-2 px-4 bg-opacity-80'>
							Привет, Поля 😊
						</h3>
					</Header>
					<Content></Content>
					<Footer className='flex justify-center p-6 z-0 relative'>
						<div ref={storyCircleRef} id='circle'>
							<ButtonToolbar>
								<IconButton
									appearance='ghost'
									size='lg'
									circle
									icon={<Icon icon='file-text' />}
									onClick={handleStoryBtnClick}
								/>
							</ButtonToolbar>
						</div>
					</Footer>
				</Container>
			)}
		</WaterWave>
	);
};

export default HomeStart;
