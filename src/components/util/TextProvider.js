import Modal from 'react-modal';
import { FlexboxGrid } from 'rsuite';

Modal.setAppElement('#root');

const TextProvider = ({ isOpen }) => {
	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={() => {}}
			onRequestClose={() => {}}
			contentLabel='Example Modal'
			style={{
				overlay: {
					zIndex: 40,
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				},
				content: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					border: 'none',
					borderRadius: '0',
					background: 'none',
					overflow: 'auto',
					WebkitOverflowScrolling: 'touch',
				},
			}}
		>
			<FlexboxGrid justify='center' className='text-provider-panel top-panel'>
				<FlexboxGrid.Item>
					<h4>Upper panel</h4>
				</FlexboxGrid.Item>
			</FlexboxGrid>
			<p className='text-provider-content'>
				Proin rutrum tristique metus ut dignissim. Aenean libero nisl, pretium
				eget elit blandit, auctor placerat nulla. Ut in gravida sapien. Mauris
				ullamcorper augue suscipit vestibulum auctor. Phasellus porta laoreet
				velit eget feugiat. Integer consectetur nisi nec purus posuere, a
				venenatis mauris fermentum. Etiam sit amet varius mi. Sed porttitor mi
				felis, mollis vestibulum purus ornare molestie. Proin consectetur
				imperdiet est, a pretium dolor suscipit eget. Fusce tristique
				scelerisque felis ut ornare. Aenean molestie diam risus, et dictum lacus
				laoreet eu. Curabitur eget lorem posuere ligula eleifend volutpat.
				Vestibulum ut tristique felis. Nunc nibh lacus, convallis ac nisl et,
				dignissim sodales sem. Morbi ultricies arcu lacus, a mollis urna
				placerat vel. Sed porttitor fermentum justo.
			</p>
			<FlexboxGrid
				justify='center'
				className='text-provider-panel bottom-panel'
			>
				<FlexboxGrid.Item>
					<h4>Bottom panel</h4>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Modal>
	);
};

export default TextProvider;
