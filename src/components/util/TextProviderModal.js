import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TextProviderModal(props) {
	const addedContentClass = `${props.autohide} modal-blur-${props.blurLevel}`;

	return (
		<Modal
			isOpen={props.isOpen}
			onAfterOpen={props.openCallback}
			contentRef={props.contentElRef}
			contentLabel='Story overlay text'
			style={{
				overlay: {
					zIndex: 40,
					backgroundColor: `rgba(0, 0, 0, ${
						Math.round((props.blurLevel / 8) * 0.4 * 100) / 100
					})`,
					transition: 'background-color 0.35s ease',
				},
				content: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					border: 'none',
					borderRadius: '0',
					background: 'none',
					overflowX: 'hidden',
					overflowY: 'scroll',
				},
			}}
			contentElement={(contentProps, children) => (
				<div
					{...{
						...contentProps,
						className: `${contentProps.className} ${addedContentClass}`,
					}}
				>
					{children}
				</div>
			)}
		>
			{props.children}
		</Modal>
	);
}
