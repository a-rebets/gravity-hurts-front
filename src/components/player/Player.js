import { ButtonToolbar, Icon, IconButton } from 'rsuite';
import ReactPlayer from 'react-player/lazy';
import { Component } from 'react';
import PlayerModal from './PlayerModal';

class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			playing: true,
			modalShown: false,
			btnIcon: 'play',
			btnText: 'Включить',
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.loadUrl('https://www.youtube.com/watch?v=VaKzNtwPQxE');
		}, 4000);
		window.addEventListener('blur', this.handleBlur);
	}
	componentWillUnmount() {
		window.removeEventListener('blur', this.handleBlur);
		window.removeEventListener('focus', this.startPlayback);
	}

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
						onReady={this.startPlayback}
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
