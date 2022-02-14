import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { FlexboxGrid, Icon } from 'rsuite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSwipeable } from 'react-swipeable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import '../../styles/story/story.less';
import StoryReaction from './StoryReaction';

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
	const [scaleSet, setscaleSet] = useState(false);
	const [minScale, setminScale] = useState(1.0);

	const changeTextShown = useCallback((val) => settextShown(val), []);

	const transformRef = useRef(null);

	const textShowSwipeHandlers = useSwipeable({
		onSwipedUp: () => settextShown(!textShown),
		...swipeConfig,
	});

	const mainImgRef = (img) => {
		const ref = transformRef.current;
		if (img && ref && !scaleSet) {
			const newScale =
				Math.round((window.innerWidth / img.offsetWidth + 0.002) * 1000) / 1000;
			setminScale(newScale);
			ref.resetTransform();
			ref.centerView(newScale + 0.002);
			setscaleSet(true);
		}
	};

	return (
		<div className='story-modal'>
			<TransformWrapper
				ref={transformRef}
				minScale={minScale}
				doubleClick={{ disabled: true }}
				zoomAnimation={{ disabled: true }}
				disabled={textShown}
			>
				{() => (
					<>
						{!textShown && (
							<div
								{...textShowSwipeHandlers}
								className='absolute bottom-0 left-0 w-full z-40 pb-4'
							>
								<FlexboxGrid justify='center'>
									<FlexboxGrid.Item className='text-show-icon-wrap'>
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
								ref={mainImgRef}
							/>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
			<LazyLoadImage {...backgroundImgProps} src={source} />
			<Suspense fallback={<></>}>
				<TextProvider
					shown={textShown}
					changeShownCallback={changeTextShown}
					blurDelta={100}
					topPanelAutohide
				>
					<p className='text-provider-content'>
						Praesent lobortis lectus a dictum aliquet. Donec sagittis malesuada
						eros ut aliquet. In suscipit enim massa. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Duis eu lacus viverra sem aliquam
						efficitur nec non ante. Donec laoreet ligula eros, id hendrerit sem
						sagittis cursus. Sed euismod, odio blandit finibus eleifend, dui
						elit consequat tellus, quis ullamcorper sem tellus quis odio. Donec
						euismod nisl ac dui tempor, ullamcorper commodo sem consectetur.
						Pellentesque in ante nibh. Cras auctor purus augue, at rutrum urna
						imperdiet at. Vestibulum suscipit sodales est, quis condimentum diam
						pulvinar eu. Class aptent taciti sociosqu ad litora torquent per
						conubia nostra, per inceptos himenaeos. Quisque nec condimentum
						libero, ut ornare neque. Etiam dignissim sed lectus eu varius. Donec
						augue nunc, dapibus sit amet sapien sed, auctor pretium nisl. Donec
						pretium pretium varius. Aenean ut nisl at enim blandit ultricies.
						Suspendisse et ipsum ut velit dapibus semper. Etiam luctus orci
						mauris, sed eleifend purus dictum et. Nulla id velit cursus,
						bibendum felis vitae, venenatis risus. Vestibulum pellentesque
						aliquam mattis. Nam auctor turpis a augue pharetra porta. Praesent
						sodales erat blandit mi consectetur, nec euismod libero placerat.
						Phasellus varius, lacus et accumsan congue, metus eros maximus nisl,
						sit amet consequat leo dui sit amet ex. Sed ullamcorper nisi ac
						iaculis dictum. Quisque dapibus sem quis leo rhoncus semper.
						Curabitur dictum nunc est, lacinia venenatis urna ornare at. Duis ac
						sem sodales tellus euismod molestie. Maecenas commodo dui in ligula
						cursus, in consectetur arcu feugiat. Pellentesque ornare egestas
						sem, in eleifend nisl vestibulum non. Pellentesque ac dignissim
						eros, eu rhoncus magna. Mauris vel justo sollicitudin, aliquet elit
						nec, pulvinar turpis. Pellentesque luctus nibh ut tempus viverra.
						Curabitur eleifend, velit ac molestie dapibus, ante mi sodales
						tortor, ac gravida sapien dolor quis mauris. Phasellus auctor dolor
						eget orci consectetur fringilla. Quisque eu dolor ac magna sodales
						aliquam. Quisque malesuada arcu id eros vestibulum commodo. In
						tempor nibh lacus, quis bibendum est bibendum sit amet. Vestibulum
						sed lectus dui. Aliquam magna ante, sagittis mollis cursus nec,
						faucibus eu felis. Morbi ac mauris feugiat, finibus magna at,
						pellentesque arcu. Curabitur sit amet nulla turpis. Aliquam ornare
						orci in justo lobortis, vitae auctor libero fringilla. Nam sit amet
						fringilla mi, at commodo velit. Pellentesque rhoncus viverra
						lacinia. Praesent id consectetur nisi. Duis laoreet fermentum mi non
						tempus. Nunc bibendum, mauris vitae vehicula lobortis, justo eros
						aliquet purus, sit amet pulvinar massa sapien a purus. Fusce nec
						quam massa. Ut et enim at nisl blandit fringilla. Proin consequat
						fringilla dolor non feugiat. Maecenas vel eros vitae velit consequat
						commodo. In in tellus congue metus lobortis convallis. Suspendisse
						potenti. Cras egestas laoreet sapien a consectetur. Nam suscipit
						ante hendrerit, efficitur libero et, venenatis nisl. Quisque at
						magna in est fermentum iaculis vel ut ligula. Nulla ornare ante
						lobortis, scelerisque libero ac, consequat augue. Donec sit amet
						neque augue. Cras ut sollicitudin leo. Duis cursus neque nec lectus
						auctor, eu feugiat odio tempus. Sed laoreet elit et neque porttitor
						condimentum. Ut ultricies magna ut dolor convallis mollis. Aenean
						luctus varius finibus. Donec cursus purus tincidunt nulla porta,
						eget tempus dolor dapibus. Sed molestie dui felis, quis dapibus
						risus consequat a. Vivamus non feugiat nunc. Suspendisse quis
						aliquam mauris. Pellentesque dignissim sem leo, nec sodales nisl
						cursus venenatis. Fusce ut quam sed nunc volutpat luctus. Fusce
						rhoncus lacus et posuere cursus. Donec dictum, tellus id placerat
						feugiat, justo risus auctor erat, in dignissim enim tortor at erat.
						Cras ultricies libero dictum mi molestie mollis. Interdum et
						malesuada fames ac ante ipsum primis in faucibus. Donec id risus
						felis. Duis ut sem sed mauris facilisis pretium et et nulla. Proin
						vestibulum urna ac tortor tincidunt pretium. Sed neque libero,
						dapibus at leo vel, sagittis pretium odio. Curabitur laoreet egestas
						imperdiet. Fusce sed mattis metus. Vivamus rhoncus vestibulum porta.
						Morbi mollis enim sed hendrerit placerat. Etiam posuere vehicula
						scelerisque. Maecenas at nunc risus. Donec tempus egestas tellus id
						feugiat. Suspendisse potenti. Sed nec tristique tortor, in sodales
						leo. In sit amet sodales nunc, ac pellentesque risus. Cras dui
						felis, lacinia et urna varius, efficitur dapibus magna. Praesent
						elementum semper convallis. In commodo dignissim sollicitudin.
						Maecenas ultrices dolor sit amet feugiat congue. Vestibulum eu
						ultrices libero. Etiam a iaculis justo, sed fermentum nunc. Vivamus
						vel justo tincidunt nisi auctor blandit id nec arcu. Nullam at
						consequat mauris, quis blandit dui.
					</p>
					<StoryReaction />
				</TextProvider>
			</Suspense>
		</div>
	);
};

export default StoryImage;
