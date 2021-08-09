import { Container, Header, Content, Footer } from 'rsuite';
import WaterWave from 'react-water-wave';
import waterLayerBg from '../assets/bg.jpg';
import '../styles/home.less';

const HomePage = () => {
	return (
		<Container className='w-full h-full overflow-hidden absolute top-0 left-0 '>
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

export default HomePage;
