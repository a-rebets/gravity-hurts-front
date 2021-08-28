import { Container, Header, Content, Grid, Row, Col, Icon } from 'rsuite';
import tempImg from '../../assets/minutes-soon.png';

import '../../styles/panels/filmtok.less';

const Filmtok = () => {
	return (
		<Container className='filmtok wrapper rs-carousel-slider-item'>
			<Header className='flex justify-center mt-5 mb-7 z-10'>
				<Icon icon='logo-video' size='3x' />
			</Header>
			<Content className='z-10'>
				<Grid fluid>
					<Row>
						<Col xs={24}>
							<h2 className='title-announce'>уже скоро . . .</h2>
						</Col>
					</Row>
					<Row>
						<Col xs={14} xsOffset={5}>
							<img className='w-full my-9' src={tempImg} alt='miss minutes' />
						</Col>
					</Row>
					<Row>
						<Col xs={20} xsOffset={2}>
							<p className='text-lg px-4 text-center'>
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
