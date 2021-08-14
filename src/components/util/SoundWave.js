import { memo } from 'react';

const SoundWave = memo(({ enabled }) => {
	const component = (
		<div className='rs-btn'>
			<div className='sound-wave'>
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<i key={i} className='bar'></i>
					))}
			</div>
		</div>
	);

	return enabled ? component : <></>;
});

export default SoundWave;
