import { FlexboxGrid, List, Toggle } from 'rsuite';

const data = [
	'Roses are red',
	"'Cause I'm the boy that your boy hoped that you would avoid",
	'Sugar is sweet',
	'And so are you',
];

const SongLyrics = () => {
	return (
		<>
			<FlexboxGrid className='py-2' align='middle'>
				<FlexboxGrid.Item>
					<Toggle size='md' className='mr-2' />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item>
					<p>
						<strong>Live mode</strong>
					</p>
				</FlexboxGrid.Item>
			</FlexboxGrid>
			<List hover>
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
