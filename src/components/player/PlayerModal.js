import { Button, Modal } from 'rsuite';
import SongCard from './SongCard';

const PlayerModal = ({ shown, closeCallback, modalCallback, ...rest }) => {
	return (
		<Modal
			className='player-modal'
			size='xs'
			show={shown}
			onHide={closeCallback}
			onExited={modalCallback}
		>
			<Modal.Header closeButton={false}>
				<Modal.Title>Трек на сегодня ✨</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SongCard {...rest} />
			</Modal.Body>
			<Modal.Footer>
				<Button appearance='subtle' onClick={closeCallback} block>
					Вернуться
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PlayerModal;
