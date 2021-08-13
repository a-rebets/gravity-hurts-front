const RainbowProgress = ({ progress }) => {
	return (
		<div className='progress'>
			<span className='progress-bar' style={{ width: `${progress}%` }}></span>
		</div>
	);
};

export default RainbowProgress;
