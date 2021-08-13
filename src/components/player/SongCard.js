import { FlexboxGrid, Divider, Tag } from 'rsuite';
import Marquee from 'react-fast-marquee';
import Truncate from 'react-truncate';
import { useEffect, useRef, useState } from 'react';

const SongCard = () => {
	const songTitleRef = useRef(null);
	const albumRef = useRef(null);
	const [titleOverflow, settitleOverflow] = useState(false);
	const [albumTruncWidth, setalbumTruncWidth] = useState(0);

	useEffect(() => {
		handleTitleMarquee();
		handleAlbumSize();
	}, []);

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
				<FlexboxGrid.Item colspan={10}>
					<img
						src='https://images.genius.com/b93a62e41ee43d801cbd94e2013c22e0.1000x1000x1.jpg'
						className='w-full'
						alt='cover'
					/>
				</FlexboxGrid.Item>
			</FlexboxGrid>
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
			<FlexboxGrid justify='center' align='middle' className='mb-2'>
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
		</>
	);
};

export default SongCard;
