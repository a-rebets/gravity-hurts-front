import { Container, Header, Content, Footer } from 'rsuite';
import WaterWave from 'react-water-wave';
import waterLayerBg from '../../assets/bg.jpg';

const HomeStart = () => {
	return (
		<Container className='wrapper'>
			<WaterWave className='water-layer' imageUrl={waterLayerBg}>
				{(_) => (
					<>
						<Header></Header>
						<Content></Content>
						<Footer></Footer>
					</>
				)}
			</WaterWave>
		</Container>
	);
};

export default HomeStart;
