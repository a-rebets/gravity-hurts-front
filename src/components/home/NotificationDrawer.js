import { memo } from 'react';
import { Drawer, Placeholder } from 'rsuite';

const { Paragraph } = Placeholder;

const NotificationDrawer = memo(({ shown, callback }) => {
	return (
		<Drawer size='xs' placement='left' show={shown} onHide={callback}>
			<Drawer.Header>
				<Drawer.Title>Уведомления</Drawer.Title>
			</Drawer.Header>
			<Drawer.Body>
				<Paragraph active />
			</Drawer.Body>
		</Drawer>
	);
});

export default NotificationDrawer;
