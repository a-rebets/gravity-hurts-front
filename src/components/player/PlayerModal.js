import { memo } from 'react';
import { Button, Modal } from 'rsuite';
import SongCard from './SongCard';

const PlayerModal = memo(({ shown, callback, ...rest }) => {
	return (
		<Modal className='player-modal' size='xs' show={shown} onHide={callback}>
			<Modal.Header closeButton={false}>
				<Modal.Title>Трек на сегодня ✨</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SongCard {...rest} />
			</Modal.Body>
			<Modal.Footer>
				<Button appearance='subtle' size='lg' onClick={callback} block>
					Вернуться
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default PlayerModal;
