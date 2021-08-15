import { Loader } from 'rsuite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { cloneElement, useState } from 'react';

const StoryImage = ({ source }) => {
	const [loading, setloading] = useState(true);

	const loadedImg = (
		<LazyLoadImage
			effect='opacity'
			alt='story image'
			width='100%'
			src={source}
			afterLoad={() => {
				setTimeout(() => {
					setloading(false);
				}, 100);
			}}
		/>
	);

	const backgroundImgProps = {
		className: 'object-cover',
		wrapperClassName: 'relative z-20',
		height: '100%',
		afterLoad: () => {},
	};

	return (
		<div className='absolute w-full h-full z-20 top-0 left-0'>
			<TransformWrapper
				wheel={{ disabled: true }}
				doubleClick={{ disabled: true }}
				zoomAnimation={{ disabled: true }}
				centerOnInit
			>
				<TransformComponent
					wrapperClass='z-30 top-0 left-0 backdrop-filter backdrop-blur'
					wrapperStyle={{ height: '100%', width: '100%', position: 'absolute' }}
				>
					{loadedImg}
				</TransformComponent>
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
