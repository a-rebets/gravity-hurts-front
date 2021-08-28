import { Component, createRef } from 'react';
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
		this.prevScrollY = createRef();
		this.prevScrollY.current = -1;
	}

	componentWillUnmount() {
		if (this.state.scrollEventSet) {
			this.modalInner.removeEventListener('scroll', this.handleScroll);
		}
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
		if (this.prevScrollY.current !== currScrollY) {
			const proportion = currScrollY / (0.5 * window.innerHeight);
			const newLevel = 2 * Math.floor((proportion * 8) / 2);
			if (newLevel !== this.state.blurLevel && newLevel >= 0) {
				if (newLevel <= 8) {
					this.setState({ blurLevel: newLevel });
				}
				this.switchTopPanel(newLevel);
			}
			this.prevScrollY.current = currScrollY;
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
		const topPanelClassAdded = this.props.topPanelAutohide
			? `autohide ${this.state.topPanelVisible ? 'shown' : ''}`
			: '';

		return (
			<TextProviderModal
				contentElRef={this.initContentElementRef}
				isOpen={this.props.shown}
				openCallback={this.requestOpen}
				blurLevel={this.state.blurLevel}
			>
				<FlexboxGrid
					justify='center'
					className={`text-provider-panel top-panel ${topPanelClassAdded}`}
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
