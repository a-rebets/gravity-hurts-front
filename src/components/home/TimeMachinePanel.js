import { memo } from 'react';
import { Container, Header, Content, Footer, Grid, Row, Col } from 'rsuite';
import LoadingBlob from '../blobs/loading';
import Countdown from '../util/Countdown';
import RainbowProgress from '../util/Progress';
import '../../styles/timemachine.less';

const TimeMachine = memo(() => {
	return (
		<Container className='wrapper px-6 py-10 rs-carousel-slider-item'>
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
			<Content className='py-8'>
				<Countdown digitSpan={9} textSpan={15} />
				<RainbowProgress progress={70} />
			</Content>
			<Footer></Footer>
		</Container>
	);
});

export default TimeMachine;
