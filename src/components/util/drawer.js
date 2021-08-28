import { memo } from 'react';
import { Drawer, Placeholder } from 'rsuite';

const { Paragraph } = Placeholder;

const NotificationDrawer = memo(
	({ swipeHandlers, shown, closeCallback, modalCallback }) => {
		return (
			<Drawer
				size='xs'
				placement='left'
				show={shown}
				onHide={() => {
					if (shown) {
						closeCallback();
					}
				}}
				onExited={modalCallback}
			>
				<div {...swipeHandlers}>
					<Drawer.Header>
						<Drawer.Title>Уведомления</Drawer.Title>
					</Drawer.Header>
					<Drawer.Body>
						<Paragraph active />
					</Drawer.Body>
				</div>
			</Drawer>
		);
	}
);

export default NotificationDrawer;
