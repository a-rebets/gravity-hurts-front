import { memo } from 'react';
import { Button, Modal, Grid, Row, Col, Divider } from 'rsuite';
import SongCard from './SongCard';
import SongLyrics from './SongLyrics';

const PlayerModal = memo(({ shown, callback, ...rest }) => {
	return (
		<Modal
			className='player-modal'
			size='xs'
			overflow={true}
			show={shown}
			onHide={callback}
		>
			<Modal.Header closeButton={false}>
				<Modal.Title>Трек на сегодня</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Grid fluid>
					<Row>
						<Col xs={24} style={{ padding: 0 }}>
							<SongCard {...rest} />
						</Col>
					</Row>
					<Row>
						<Divider>
							<em>Текст песни</em>
						</Divider>
					</Row>
					<Row>
						<Col xs={24} style={{ padding: 0 }}>
							<SongLyrics />
						</Col>
					</Row>
				</Grid>
			</Modal.Body>
			<Modal.Footer>
				<Button appearance='default' onClick={callback} block>
					Вернуться
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default PlayerModal;
