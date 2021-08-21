import { memo } from 'react';
import {
	Container,
	Header,
	Content,
	Footer,
	Grid,
	Row,
	Col,
	FlexboxGrid,
	Tag,
} from 'rsuite';
import LoadingBlob from '../blobs/loading';
import Countdown from '../util/Countdown';
import RainbowProgress from '../util/Progress';
import '../../styles/timemachine.less';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';

const TimeMachine = memo(() => {
	return (
		<Container className='wrapper px-9 py-10 rs-carousel-slider-item'>
			<Header>
				<Grid fluid>
					<Row>
						<Col xs={24} className='py-3'>
							<LoadingBlob />
						</Col>
					</Row>
					<Row>
						<Col xs={24}>
							<h3 className='font-medium text-center'>Машина времени</h3>
						</Col>
					</Row>
				</Grid>
			</Header>
			<Content className='timemachine-content pt-5 pb-8'>
				<Countdown />
				<FlexboxGrid justify='center'>
					<FlexboxGridItem>
						<Tag>до: твоего приезда</Tag>
					</FlexboxGridItem>
				</FlexboxGrid>
			</Content>
			<Footer>
				<RainbowProgress progress={70} />
				<FlexboxGrid justify='space-between' className='py-3 px-1'>
					<FlexboxGridItem>
						<h2>🇧🇾</h2>
					</FlexboxGridItem>
					<FlexboxGridItem>
						<h2>🇵🇱</h2>
					</FlexboxGridItem>
				</FlexboxGrid>
			</Footer>
		</Container>
	);
});

export default TimeMachine;
