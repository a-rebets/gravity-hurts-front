import {
	Button,
	Container,
	Content,
	FlexboxGrid,
	Footer,
	Header,
} from 'rsuite';
import '../styles/default.less';
import defaultImg from '../assets/pic.jpg';
import Timer from '../components/util/Timer';

function DefaultPage() {
	return (
		<Container className='wrapper default'>
			<Header>
				<h4 className='text-center pt-8 pb-5'>Привет</h4>
			</Header>
			<Content>
				<FlexboxGrid justify='center'>
					<FlexboxGrid.Item colspan={20}>
						<img
							src={defaultImg}
							alt='default preview'
							className='w-full rounded-xl'
						/>
					</FlexboxGrid.Item>
					<FlexboxGrid.Item colspan={18}>
						<Timer />
					</FlexboxGrid.Item>
					<FlexboxGrid.Item colspan={20}>
						<Button
							appearance='primary'
							block
							color='violet'
							href='https://calendar.google.com/event?action=TEMPLATE&tmeid=N3A0NGQ2c2pjM2t1YWs1MzRsYzVnYzI2N28gYXBvcGVseXNoZXZAbQ&tmsrc=apopelyshev%40gmail.com'
						>
							А пока - сохрани это 🤍
						</Button>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
			<Footer className='py-3 text-center'>
				<p>
					Made with ❤️ by <a href='https://github.com/apopelyshev'>Artem</a>
				</p>
			</Footer>
		</Container>
	);
}

export default DefaultPage;
