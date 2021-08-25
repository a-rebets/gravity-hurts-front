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

const StoryImage = ({ source, setLoadedCallback }) => {
	const [textShown, settextShown] = useState(false);
	const [transformScale, settransformScale] = useState(1);

	const textShowSwipeHandlers = useSwipeable({
		onSwipedUp: () => {
			if (!textShown) {
				settextShown(true);
			}
		},
		...swipeConfig,
	});

	const setImageScale = (ref) => {
		const img = ref.instance.contentComponent.firstChild;
		const newScale =
			Math.round((window.innerWidth / img.offsetWidth) * 100) / 100;
		settransformScale(newScale);
		ref.centerView((newScale + 0.005).toFixed(3));
	};

	return (
		<div className='story-modal'>
			<TransformWrapper
				doubleClick={{ disabled: true }}
				minScale={transformScale}
				zoomAnimation={{ disabled: true }}
				disabled={textShown}
				onInit={setImageScale}
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
								onLoad={() => setLoadedCallback(true)}
							/>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
			<LazyLoadImage {...backgroundImgProps} src={source} />
			<Suspense fallback={<></>}>
				<TextProvider shown={textShown} closeCallback={settextShown}>
					<p className='text-provider-content'>
						Proin rutrum tristique metus ut dignissim. Aenean libero nisl,
						pretium eget elit blandit, auctor placerat nulla. Ut in gravida
						sapien. Mauris ullamcorper augue suscipit vestibulum auctor.
						Phasellus porta laoreet velit eget feugiat. Integer consectetur nisi
						nec purus posuere, a venenatis mauris fermentum. Etiam sit amet
						varius mi. Sed porttitor mi felis, mollis vestibulum purus ornare
						molestie. Proin consectetur imperdiet est, a pretium dolor suscipit
						eget. Fusce tristique scelerisque felis ut ornare. Aenean molestie
						diam risus, et dictum lacus laoreet eu. Curabitur eget lorem posuere
						ligula eleifend volutpat. Vestibulum ut tristique felis. Nunc nibh
						lacus, convallis ac nisl et, dignissim sodales sem. Morbi ultricies
						arcu lacus, a mollis urna placerat vel. Sed porttitor fermentum
						justo.
					</p>
				</TextProvider>
			</Suspense>
		</div>
	);
};

export default StoryImage;
