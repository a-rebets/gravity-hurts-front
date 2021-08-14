import { List, Button, ButtonToolbar } from 'rsuite';

const data = [
	'Roses are red',
	"'Cause I'm the boy that your boy hoped that you would avoid",
	'Sugar is sweet',
	'And so are you',
];

const SongLyrics = () => {
	return (
		<>
			<ButtonToolbar className='py-2'>
				<Button appearance='default' color='red' size='xs' block>
					🔴 Live mode
				</Button>
			</ButtonToolbar>
			<List>
				{data.map((item, index) => (
					<List.Item key={index} index={index}>
						{item}
					</List.Item>
				))}
			</List>
		</>
	);
};

export default SongLyrics;
