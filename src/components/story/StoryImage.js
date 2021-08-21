import { FlexboxGrid, Loader, Icon } from 'rsuite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { cloneElement, lazy, Suspense, useState } from 'react';

import '../../styles/story.less';
import { useSwipeable } from 'react-swipeable';

const TextProvider = lazy(() => import('../util/TextProvider'));

const swipeConfig = {
	delta: 50,
	trackTouch: true,
	trackMouse: true,
};

const StoryImage = ({ source }) => {
	const [loading, setloading] = useState(true);
	const [textShown, settextShown] = useState(false);

	const loadedImg = (
		<LazyLoadImage
			effect='opacity'
			alt='story image'
			width='100%'
			src={source}
		/>
	);

	const backgroundImgProps = {
		className: 'object-cover',
		wrapperClassName: 'relative z-20',
		height: '100%',
		afterLoad: () => {},
	};

	const textShowSwipeHandlers = useSwipeable({
		onSwipedUp: () => {
			if (!textShown) {
				settextShown(true);
			}
		},
		...swipeConfig,
	});

	return (
		<div className='story-modal absolute w-full h-full z-20 top-0 left-0'>
			<TransformWrapper
				wheel={{ disabled: true }}
				doubleClick={{ disabled: true }}
				zoomAnimation={{ disabled: true }}
				initialPositionY={100}
				disabled={textShown}
			>
				{({ centerView }) => (
					<>
						<div
							{...textShowSwipeHandlers}
							className='absolute bottom-0 left-0 w-full z-40 pt-12 pb-6'
						>
							<FlexboxGrid justify='center'>
								<FlexboxGrid.Item>
									{!textShown && (
										<Icon
											className='text-show-icon'
											icon='arrow-up2'
											size='2x'
										/>
									)}
									<Suspense fallback={<></>}>
										{textShown && <TextProvider closeCallback={settextShown} />}
									</Suspense>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</div>
						<TransformComponent
							wrapperClass='z-30 top-0 left-0 backdrop-filter backdrop-blur'
							wrapperStyle={{
								height: '100%',
								width: '100%',
								position: 'absolute',
							}}
						>
							{cloneElement(
								loadedImg,
								{
									afterLoad: () => {
										centerView(1);
										setloading(false);
									},
								},
								null
							)}
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
			{cloneElement(loadedImg, backgroundImgProps, null)}
			{loading && (
				<Loader
					className='z-30'
					size='lg'
					backdrop
					content='Загружаем...'
					vertical
				/>
			)}
		</div>
	);
};

export default StoryImage;
