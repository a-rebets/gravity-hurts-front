import { FlexboxGrid, Icon } from 'rsuite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { lazy, Suspense, useState } from 'react';

import '../../styles/story.less';
import { useSwipeable } from 'react-swipeable';

const TextProvider = lazy(() => import('../util/TextProvider'));

const swipeConfig = {
	delta: 50,
	trackTouch: true,
	trackMouse: true,
};

const backgroundImgProps = {
	className: 'object-cover',
	wrapperClassName: 'relative z-20',
	height: '100%',
	effect: 'opacity',
	alt: 'story background',
	width: '100%',
};

const StoryImage = ({ source }) => {
	const [textShown, settextShown] = useState(false);

	const textShowSwipeHandlers = useSwipeable({
		onSwipedUp: () => {
			if (!textShown) {
				settextShown(true);
			}
		},
		...swipeConfig,
	});

	return (
		<div className='story-modal absolute w-full h-full top-0 left-0'>
			<TransformWrapper
				wheel={{ disabled: true }}
				doubleClick={{ disabled: true }}
				zoomAnimation={{ disabled: true }}
				disabled={textShown}
				onInit={(ref) => ref.centerView(1)}
			>
				{() => (
					<>
						{!textShown && (
							<div
								{...textShowSwipeHandlers}
								className='absolute bottom-0 left-0 w-full z-40 pt-12 pb-6'
							>
								<FlexboxGrid justify='center'>
									<FlexboxGrid.Item>
										<Icon
											className='text-show-icon'
											icon='arrow-up2'
											size='lg'
										/>
									</FlexboxGrid.Item>
								</FlexboxGrid>
							</div>
						)}
						<TransformComponent
							wrapperClass='z-30 top-0 left-0 backdrop-filter backdrop-blur'
							wrapperStyle={{
								height: '100%',
								width: '100%',
								position: 'absolute',
							}}
						>
							<img
								src={source}
								alt='story headline'
								className='w-full filter blur-0'
							/>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
			<LazyLoadImage {...backgroundImgProps} src={source} />
			<Suspense fallback={<></>}>
				<TextProvider shown={textShown} closeCallback={settextShown} />
			</Suspense>
		</div>
	);
};

export default StoryImage;
