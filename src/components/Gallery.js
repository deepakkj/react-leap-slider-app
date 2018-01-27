import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';

class Gallery extends Component {
	constructor (props) {
		super(props);
		this.state = {
			lightboxIsOpen: true,
			currentImage: 0,
		};
	}

componentWillReceiveProps(nextProps) {
		if(this.props.gestures !== nextProps.gestures) {
			// debugger
			const swipeType = this.getSwipeDirection(nextProps.gestures);
			switch(swipeType) {
				case 'right':
					console.log('Goto previous image');
					this.gotoPrevious();
					break;
				case 'left':
					console.log('Goto next image');
					this.gotoNext();
					break;
				case 'up':
					console.log('Goto last image');
				//	this.gotoLast();
					break;
				case 'down':
					console.log('Goto first image');
				//	this.gotoFirst();
					break;
				case 'circle':
					console.log('circle detected');
					break;
				default: return;
			}
		}
}

	getSwipeDirection = (gestures) => {
		let swipeDirection = '';
		if (gestures.length > 4 ) {
			for (var i = 0; i < gestures.length; i++) {
				var gesture = gestures[i];
				 if(gesture.type == "circle") {
				 console.log(gesture.duration);
				 swipeDirection = "circle";
			 	}
				else if (gesture.type == "swipe" && gesture.duration > 130000 && gesture.state === "stop") {
					//Classify swipe as either horizontal or vertical
					console.log(gesture.duration);
					var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
					//Classify as right-left or up-down
					if (isHorizontal) {
						if (gesture.direction[0] > 0) {
							swipeDirection = "right";
						} else {
							swipeDirection = "left";
						}
					} else { //vertical
						if (gesture.direction[1] > 0) {
							swipeDirection = "up";
						} else {
							swipeDirection = "down";
						}
					}
				}
			}
		}
		return swipeDirection;
	}

	openLightbox = (index, event) => {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox =  () => {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious =  () => {
		if (this.state.currentImage - 1 >= 0) {
			this.setState(() => ({
				currentImage: this.state.currentImage - 1,
			}));
	}
	}
	gotoNext = () => {
		if (this.state.currentImage + 1 <= this.props.images.length - 1) {
			this.setState(() => ({
				currentImage: this.state.currentImage + 1,
			}));
	}
	}
	gotoFirst = () => {
		this.setState(() => ({
			currentImage: 0,
		}));
	}
	gotoLast = () => {
		this.setState(() => ({
			currentImage: this.props.images.length - 1,
		}));
	}
	gotoImage = (index) => {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage = () => {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery = () => {
		const { images } = this.props;

		if (!images) return;

		const gallery = images.filter(i => i.useForDemo).map((obj, i) => {
			return (
				<a
					href={obj.src}
					className={css(classes.thumbnail, classes[obj.orientation])}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
				>
					<img src={obj.src} className={css(classes.source)} />
				</a>
			);
		});

		return (
			<div className={css(classes.gallery)}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{/*this.renderGallery()*/}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					showThumbnails={this.props.showThumbnails}
				/>
			</div>
		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
};

const gutter = {
	small: 2,
	large: 4,
};
const classes = StyleSheet.create({
	gallery: {
		marginRight: -gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			marginRight: -gutter.large,
		},
	},

	// anchor
	thumbnail: {
		boxSizing: 'border-box',
		display: 'block',
		float: 'left',
		lineHeight: 0,
		paddingRight: gutter.small,
		paddingBottom: gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			paddingRight: gutter.large,
			paddingBottom: gutter.large,
		},
	},

	// orientation
	landscape: {
		width: '30%',
	},
	square: {
		paddingBottom: 0,
		width: '40%',

		'@media (min-width: 500px)': {
			paddingBottom: 0,
		},
	},

	// actual <img />
	source: {
		border: 0,
		display: 'block',
		height: 'auto',
		maxWidth: '100%',
		width: 'auto',
	},
});

export default Gallery;
