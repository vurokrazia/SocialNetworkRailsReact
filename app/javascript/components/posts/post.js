import React from 'react';
import {Card, CardText} from 'material-ui/Card';

export class Post extends React.Component{
	render(){
		return(
				<Card>
					<CardText>
						{this.props.html_content}
					</CardText>
				</Card>
			);		
	}
}