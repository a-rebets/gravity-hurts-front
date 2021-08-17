import { Container, Header, Content, Grid, Row, Col, Icon } from 'rsuite';
import tempImg from '../../assets/minutes-soon.png';

import '../../styles/filmtok.less';

const Filmtok = () => {
	return (
		<Container className='filmtok wrapper rs-carousel-slider-item pt-12'>
			<Header className='flex justify-center my-8 z-10'>
				<Icon icon='logo-video' size='4x' />
			</Header>
			<Content className='z-10 select-none'>
				<Grid fluid>
					<Row>
						<Col xs={24}>
							<h1 className='text-center font-medium ml-7'>уже скоро . . .</h1>
						</Col>
					</Row>
					<Row>
						<Col xs={16} xsOffset={4}>
							<img className='w-full my-10' src={tempImg} alt='miss minutes' />
						</Col>
					</Row>
					<Row>
						<Col xs={20} xsOffset={2}>
							<p className='text-xl px-2 text-center'>
								Умное хранилище неограниченного количества любимых сцен из
								сериалов, фильмов и клипов. Почти как тикток или хайлайты
								инстаграм сторис, только удобнее
							</p>
						</Col>
					</Row>
				</Grid>
			</Content>
			<div className='backdrop'></div>
		</Container>
	);
};

export default Filmtok;
