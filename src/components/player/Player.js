import { ButtonToolbar, Icon, IconButton } from 'rsuite';
import ReactPlayer from 'react-player/youtube';
import { Component } from 'react';
import PlayerModal from './PlayerModal';
import SoundWave from '../util/SoundWave';

class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			ready: false,
			playing: false,
			modalShown: false,
			wasPlaying: false,
			btnIcon: 'play',
			btnText: 'Включить',
		};
	}

	componentDidMount() {
		this.loadUrl('https://www.youtube.com/watch?v=VaKzNtwPQxE');
		window.addEventListener('focus', this.handleFocus);
	}
	componentWillUnmount() {
		window.removeEventListener('focus', this.handleFocus);
	}

	handleReady = () => this.setState({ ready: true });

	handleFocus = () => {
		if (this.state.wasPlaying) {
			this.startPlayback();
		}
	};

	loadUrl = (url) => this.setState({ url: url });

	openModal = () => {
		this.setState({ modalShown: true });
		this.props.setModalBlock(true);
	};

	togglePlayer = () =>
		this.state.playing ? this.pausePlayback() : this.startPlayback();

	stopPlayback = () => this.pausePlayback(false);

	pausePlayback = (wasPlaying = this.state.playing) => {
		this.setState({
			playing: false,
			wasPlaying,
			btnIcon: 'play',
			btnText: 'Включить',
		});
	};

	startPlayback = () =>
		this.setState({
			playing: true,
			wasPlaying: this.state.playing,
			btnIcon: 'pause',
			btnText: 'Пауза',
		});

	render() {
		return (
			<>
				<ButtonToolbar>
					<IconButton
						appearance='primary'
						icon={<Icon icon={this.state.btnIcon} />}
						placement='left'
						onClick={this.togglePlayer}
						disabled={!this.state.ready}
					>
						{this.state.btnText}
					</IconButton>
					<IconButton
						onClick={this.openModal}
						appearance='ghost'
						icon={<Icon icon='arrow-down' />}
					/>
					<SoundWave enabled={this.state.playing} />
				</ButtonToolbar>
				<ReactPlayer
					width='50%'
					height='auto'
					onPause={this.pausePlayback}
					onReady={this.handleReady}
					onEnded={this.stopPlayback}
					playing={this.state.playing}
					url={this.state.url}
					style={{ position: 'absolute', visibility: 'hidden' }}
				/>
				<PlayerModal
					shown={this.state.modalShown}
					closeCallback={() => this.setState({ modalShown: false })}
					modalCallback={() => this.props.setModalBlock(false)}
				/>
			</>
		);
	}
}

export default Player;
