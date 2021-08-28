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
import '../../styles/panels/time-machine.less';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';

const TimeMachine = memo(() => {
	return (
		<Container className='wrapper rs-carousel-slider-item timemachine'>
			<Header>
				<Grid fluid>
					<Row>
						<Col xs={24} className='py-3'>
							<LoadingBlob />
						</Col>
					</Row>
					<Row>
						<Col xs={24}>
							<h4 className='text-center'>Машина времени</h4>
						</Col>
					</Row>
				</Grid>
			</Header>
			<Content className='timemachine-content pt-5'>
				<Countdown />
				<FlexboxGrid justify='center'>
					<FlexboxGridItem>
						<Tag>до : твоего приезда</Tag>
					</FlexboxGridItem>
				</FlexboxGrid>
			</Content>
			<Footer>
				<RainbowProgress progress={70} />
				<FlexboxGrid justify='space-between' className='py-2 px-1'>
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
