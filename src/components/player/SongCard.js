import {
	IconButton,
	Icon,
	FlexboxGrid,
	Divider,
	Tag,
	Placeholder,
} from 'rsuite';
import Marquee from 'react-fast-marquee';
import Truncate from 'react-truncate';
import { useEffect, useRef, useState } from 'react';

const { Paragraph } = Placeholder;

const SongCard = () => {
	const songTitleRef = useRef(null);
	const albumRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	const [titleOverflow, settitleOverflow] = useState(false);
	const [albumTruncWidth, setalbumTruncWidth] = useState(0);

	useEffect(() => {
		if (loaded) {
			handleTitleMarquee();
			handleAlbumSize();
		}
		setTimeout(() => {
			setLoaded(true);
		}, 4000);
	}, [loaded]);

	const handleTitleMarquee = () => {
		const titleEl = songTitleRef.current.parentElement.parentElement;
		settitleOverflow(titleEl.offsetWidth < titleEl.scrollWidth);
	};

	const handleAlbumSize = () => {
		const albumEl = albumRef.current;
		const infoLine = albumEl.parentElement.parentElement;
		const tag = infoLine.firstChild;
		let delta = 0.41 - tag.offsetWidth / infoLine.offsetWidth;
		setalbumTruncWidth(Math.trunc(infoLine.offsetWidth * (0.5 + delta)));
	};

	const title = (
		<h4 className='inline-block max-w-full px-6' ref={songTitleRef}>
			<a href='https://example.com'>Let's fall in love for the night</a>
		</h4>
	);

	return (
		<>
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item colspan={12}>
					{loaded ? (
						<img
							src='https://images.genius.com/b93a62e41ee43d801cbd94e2013c22e0.1000x1000x1.jpg'
							className='w-full'
							alt='cover'
						/>
					) : (
						<Placeholder.Graph
							active
							style={{ width: '100%', height: '180px' }}
						/>
					)}
				</FlexboxGrid.Item>
			</FlexboxGrid>
			{loaded ? (
				<>
					<FlexboxGrid justify='center' className='py-4'>
						<FlexboxGrid.Item className={titleOverflow ? 'max-w-full' : ''}>
							{titleOverflow ? (
								<Marquee
									gradientColor={[41, 45, 51]}
									gradientWidth={60}
									pauseOnHover
									loop={2}
									delay={3}
								>
									{title}
								</Marquee>
							) : (
								title
							)}
						</FlexboxGrid.Item>
					</FlexboxGrid>
					<FlexboxGrid justify='center' align='middle'>
						<FlexboxGrid.Item style={{ maxWidth: '41%' }}>
							<Tag>
								<Truncate lines={1} ellipsis='..'>
									What is going on right
								</Truncate>
							</Tag>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item>
							<Divider vertical />
						</FlexboxGrid.Item>
						<FlexboxGrid.Item>
							<p className='whitespace-nowrap' ref={albumRef}>
								<Truncate lines={1} width={albumTruncWidth} ellipsis='...'>
									Blood Harmony (Deluxe)
								</Truncate>
							</p>
						</FlexboxGrid.Item>
					</FlexboxGrid>
					<Divider className='text-lg'>2017</Divider>
					<FlexboxGrid justify='center'>
						<FlexboxGrid.Item>
							<IconButton
								appearance='ghost'
								size='lg'
								icon={<Icon icon='external-link' />}
							>
								Показать текст
							</IconButton>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</>
			) : (
				<>
					<Paragraph className='loader' rows={3} active />
					<Paragraph className='loader' rows={2} active />
				</>
			)}
		</>
	);
};

export default SongCard;
