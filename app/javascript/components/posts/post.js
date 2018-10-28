import React from 'react';
import {Card, CardText, CardMedia} from 'material-ui/Card';
import {Carrusel} from '../images/carrusel';
import renderHTML from 'react-render-html';
export class Post extends React.Component{
		
	content(){
		if(this.props.post.html_content){
			return renderHTML(this.props.post.html_content);
		}else{
			return "";
		}
	}
	image(){
		if(this.props.post.images.length <= 0) return "";
			return (	
				<CardMedia>
					<Carrusel images={this.props.post.images}></Carrusel>
				</CardMedia>
				);
	}
	render(){
		return(
				<Card  style={{marginTop:"30px"}}>
					{this.image()}
					<CardText>
						{this.content()}
					</CardText>
				</Card>
			);		
	}
}