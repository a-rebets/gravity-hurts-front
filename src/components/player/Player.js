import { ButtonToolbar, Icon, IconButton } from 'rsuite';
import ReactPlayer from 'react-player/lazy';
import { Component, createRef } from 'react';
import PlayerModal from './PlayerModal';

class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			ready: false,
			playing: false,
			modalShown: false,
			btnIcon: 'play',
			btnText: 'Включить',
		};
		this.playerBtn = createRef();
	}

	componentDidMount() {
		this.loadUrl('https://www.youtube.com/watch?v=VaKzNtwPQxE');
		window.addEventListener('blur', this.handleBlur);
	}
	componentWillUnmount() {
		window.removeEventListener('blur', this.handleBlur);
		window.removeEventListener('focus', this.startPlayback);
	}

	handleReady = () => this.setState({ ready: true });

	// we don't want the player to fire up
	// when a user just focused the page for the first time
	handleBlur = () => {
		window.addEventListener('focus', this.startPlayback);
		this.stopPlayback();
	};

	loadUrl = (url) => this.setState({ url: url });

	toggleModal = () => this.setState({ modalShown: !this.state.modalShown });

	togglePlayer = () => {
		if (this.state.playing) {
			this.stopPlayback();
		} else {
			this.startPlayback();
		}
	};

	stopPlayback = () =>
		this.setState({ playing: false, btnIcon: 'play', btnText: 'Включить' });

	startPlayback = () =>
		this.setState({ playing: true, btnIcon: 'pause', btnText: 'Пауза' });

	render() {
		return (
			<>
				<ButtonToolbar>
					<IconButton
						appearance='primary'
						size='lg'
						icon={<Icon icon={this.state.btnIcon} />}
						placement='left'
						onClick={this.togglePlayer}
						disabled={!this.state.ready}
					>
						{this.state.btnText}
					</IconButton>
					<IconButton
						onClick={this.toggleModal}
						appearance='ghost'
						size='lg'
						icon={<Icon icon='arrow-down' />}
					/>
					<ReactPlayer
						width='100%'
						height='auto'
						onReady={this.handleReady}
						onEnded={this.stopPlayback}
						playing={this.state.playing}
						url={this.state.url}
						style={{ position: 'absolute', visibility: 'hidden' }}
					/>
				</ButtonToolbar>
				<PlayerModal
					shown={this.state.modalShown}
					callback={this.toggleModal}
				/>
			</>
		);
	}
}

export default Player;
