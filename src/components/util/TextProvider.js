import { Component } from 'react';
import { FlexboxGrid, Icon } from 'rsuite';
import TextProviderModal from './TextProviderModal';
import '../../styles/util/text-provider.less';

const defaultSetting = {
	blurLevel: 0,
	scrollEventSet: false,
	topPanelVisible: false,
};

class TextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = defaultSetting;
	}

	componentWillUnmount() {
		if (this.state.scrollEventSet) {
			this.modalInner.removeEventListener('scroll', this.handleScroll);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const propsCheck = nextProps.shown !== this.props.shown;
		const stateCheck = this.stateUpdateCheck(nextState);
		return propsCheck || stateCheck;
	}

	stateUpdateCheck(nextState) {
		return (
			nextState.blurLevel !== this.state.blurLevel ||
			nextState.scrollEventSet !== this.state.scrollEventSet ||
			nextState.topPanelVisible !== this.state.topPanelVisible
		);
	}

	initContentElementRef = (el) => {
		if (!this.state.scrollEventSet && this.props.shown) {
			this.modalInner = el;
			el.addEventListener('scroll', this.handleScroll, {
				passive: true,
			});
			this.setState({ scrollEventSet: true });
		}
	};

	requestOpen = () => {
		this.content = this.modalInner.getElementsByClassName(
			'text-provider-content'
		)[0];
		setTimeout(() => {
			document.documentElement.classList.add('ReactModal__Html--open');
		}, 1000);
		if (this.props.topPanelAutohide) {
			setTimeout(() => {
				this.content.classList.toggle('activated');
				this.modalInner.dispatchEvent(new Event('scroll'));
			}, 200);
		}
	};

	requestClose = () => {
		document.documentElement.classList.remove('ReactModal__Html--open');
		if (this.props.topPanelAutohide) {
			this.content.classList.toggle('activated');
		}
		setTimeout(() => {
			this.props.changeShownCallback(false);
			this.setState(defaultSetting);
		}, 500);
	};

	handleScroll = (e) => {
		const currScrollY = e.target.scrollTop + (this.props.blurDelta || 0);
		const proportion = currScrollY / (0.5 * window.innerHeight);
		let newLevel = 2 * Math.floor((proportion * 8) / 2);
		this.switchTopPanel(newLevel);
		newLevel = newLevel <= 8 ? newLevel : 8;
		if (newLevel !== this.state.blurLevel && newLevel >= 0) {
			this.setState({ blurLevel: newLevel });
		}
	};

	switchTopPanel = (scrollVal) => {
		if (this.state.topPanelVisible && scrollVal < 12) {
			this.setState({ topPanelVisible: false });
		} else if (!this.state.topPanelVisible && scrollVal >= 12) {
			this.setState({ topPanelVisible: true });
		}
	};

	render() {
		return (
			<TextProviderModal
				contentElRef={this.initContentElementRef}
				autohide={this.props.topPanelAutohide ? 'autohide' : ''}
				isOpen={this.props.shown}
				openCallback={this.requestOpen}
				blurLevel={this.state.blurLevel}
			>
				<FlexboxGrid
					justify='center'
					className={`text-provider-panel top-panel ${
						this.state.topPanelVisible ? 'shown' : ''
					}`}
				>
					<FlexboxGrid.Item>
						<h5>Upper panel</h5>
					</FlexboxGrid.Item>
				</FlexboxGrid>
				{this.state.blurLevel <= 2 && this.props.topPanelAutohide && (
					<span className='text-provider-img-icon' onClick={this.requestClose}>
						<Icon icon='image' size='2x' />
					</span>
				)}
				{this.props.children}
				<FlexboxGrid
					justify='center'
					className='text-provider-panel bottom-panel'
				>
					<FlexboxGrid.Item>
						<h5>Bottom panel</h5>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</TextProviderModal>
		);
	}
}

export default TextProvider;
