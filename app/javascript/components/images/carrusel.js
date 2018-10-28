import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
const styles = {
	image:{
		maxWidth:"100%"
	},
	container:{
		overflow:'hidden'
	},
	infiniteWidth:{
		whiteSpace:'nowrap',
		position:'relative',
		transition:"all 0.4s",
		left:"0px"
	},
	controls:{
		position: 'absolute',
		width: '100%',
		height: "100%"
	},
	leftButton:{
		position: "absolute",
		top:"47%",
		left:"-1.8em"
	},
	rightButton:{
		position: "absolute",
		top:"47%",
		right:"-1.8em"
	}
}
export class Carrusel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			images:[]
		}
	}
	controls(){
		if(this.props.images.length <= 1) return "";
		return (
			<div style={styles.controls}>
				<FloatingActionButton onClick={(e) => this.goLeft()} style={styles.leftButton} secondary={true}>
					<KeyboardArrowLeft/>
				</FloatingActionButton>
				<FloatingActionButton onClick={(e) => this.goRight()} style={styles.rightButton}  secondary={true}>
					<KeyboardArrowRight/>
				</FloatingActionButton>
			</div>
		);
	}
	images(){
		return this.props.images.map(image =>
		{
			return <img style={styles.image} src={image.urls.original} />;
		});
	}
	getLeftValue(){
		let styles = window.getComputedStyle(this.refs.carrusel,null); 
		return(parseInt(styles.getPropertyValue("left")));
	}
	goLeft(){
		let currentPosition = this.getLeftValue();
		let newPosition	= currentPosition + 300;
		if(newPosition > 0) newPosition = 0;
		this.refs.carrusel.style.left = newPosition+"px";
	}
	getContainerWidth(){
		let styles = window.getComputedStyle(this.refs.carrusel.firstChild,null);
		let imgWidth = parseInt(styles.getPropertyValue("width"));
		return imgWidth * (this.props.images.length -1);
	}
	goRight(){
		let currentPosition = this.getLeftValue();
		let newPosition	= currentPosition - 300;
		if((newPosition * -1) > this.getContainerWidth()) newPosition = -this.getContainerWidth();
		this.refs.carrusel.style.left = newPosition+"px";	
	}
	render(){
		return(
			<div style={{position:"relative"}}>
				{this.controls()}
				<div style={styles.container}>
					<div style={styles.infiniteWidth} ref="carrusel">
						{this.images()}
					</div>
				</div>
			</div>
		);
	}
}