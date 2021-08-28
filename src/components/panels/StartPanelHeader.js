import { Badge, FlexboxGrid, Header, Icon, IconButton } from 'rsuite';
import Player from '../player/Player';

const StartPanelHeader = ({ greeting, setModalBlock, drawerCallback }) => {
	return (
		<Header className='mt-12'>
			<FlexboxGrid>
				<FlexboxGrid.Item className='bg-gray-600 bg-opacity-80 pl-6 pr-4'>
					{greeting}
				</FlexboxGrid.Item>
			</FlexboxGrid>
			<FlexboxGrid align='middle' justify='space-between' className='toolbar'>
				<FlexboxGrid.Item className='px-6'>
					<Player setModalBlock={setModalBlock} />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item className='pr-6'>
					<Badge content={2}>
						<IconButton
							onClick={drawerCallback}
							appearance='primary'
							icon={<Icon icon='bell' />}
						/>
					</Badge>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Header>
	);
};

export default StartPanelHeader;
