import { Component, createRef } from 'react';
import { FlexboxGrid } from 'rsuite';
import TextProviderModal from './TextProviderModal';

class TextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blurLevel: 0,
			scrollEventSet: false,
			topPanelVisible: false,
		};
		this.prevScrollY = createRef();
		this.prevScrollY.current = 0;
	}

	componentWillUnmount() {
		if (this.state.scrollEventSet) {
			this.content.removeEventListener('scroll', this.handleScroll);
		}
	}

	contentElementRef = (el) => {
		if (!this.state.scrollEventSet) {
			this.content = el;
			el.addEventListener('scroll', this.handleScroll, {
				passive: true,
			});
			this.setState({ scrollEventSet: true });
		}
	};

	handleScroll = (e) => {
		const currScrollY = e.target.scrollTop;
		if (this.prevScrollY.current !== currScrollY) {
			const proportion = currScrollY / (0.5 * window.innerHeight);
			const calc = 2 * Math.floor((proportion * 8) / 2);
			if (calc !== this.state.blurLevel && calc >= 0) {
				this.setState({ blurLevel: calc > 8 ? 8 : calc });
				this.switchTopPanel(calc);
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

	getTopPanelOpacity = () => (this.state.topPanelVisible ? 100 : 0);

	render() {
		return this.props.shown ? (
			<TextProviderModal
				contentElRef={this.contentElementRef}
				isOpen={true}
				closeCallback={this.props.closeCallback}
				blurLevel={this.state.blurLevel}
			>
				<FlexboxGrid
					justify='center'
					className={`text-provider-panel top-panel opacity-${this.getTopPanelOpacity()}`}
				>
					<FlexboxGrid.Item>
						<h5>Upper panel</h5>
					</FlexboxGrid.Item>
				</FlexboxGrid>
				<p className='text-provider-content'>
					Proin rutrum tristique metus ut dignissim. Aenean libero nisl, pretium
					eget elit blandit, auctor placerat nulla. Ut in gravida sapien. Mauris
					ullamcorper augue suscipit vestibulum auctor. Phasellus porta laoreet
					velit eget feugiat. Integer consectetur nisi nec purus posuere, a
					venenatis mauris fermentum. Etiam sit amet varius mi. Sed porttitor mi
					felis, mollis vestibulum purus ornare molestie. Proin consectetur
					imperdiet est, a pretium dolor suscipit eget. Fusce tristique
					scelerisque felis ut ornare. Aenean molestie diam risus, et dictum
					lacus laoreet eu. Curabitur eget lorem posuere ligula eleifend
					volutpat. Vestibulum ut tristique felis. Nunc nibh lacus, convallis ac
					nisl et, dignissim sodales sem. Morbi ultricies arcu lacus, a mollis
					urna placerat vel. Sed porttitor fermentum justo.
				</p>
				<FlexboxGrid
					justify='center'
					className='text-provider-panel bottom-panel'
				>
					<FlexboxGrid.Item>
						<h5>Bottom panel</h5>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</TextProviderModal>
		) : (
			<></>
		);
	}
}

export default TextProvider;
