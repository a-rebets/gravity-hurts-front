import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TextProviderModal(props) {
	return (
		<Modal
			isOpen={props.isOpen}
			onAfterOpen={() => {}}
			onRequestClose={() => {}}
			contentRef={props.contentElRef}
			contentLabel='Story overlay text'
			htmlOpenClassName='ReactModal__Html--open'
			style={{
				overlay: {
					zIndex: 40,
					backgroundColor: `rgba(0, 0, 0, ${
						Math.round((props.blurLevel / 8) * 0.4 * 100) / 100
					})`,
					transition: 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
						className: `${contentProps.className} modal-blur-${props.blurLevel}`,
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
