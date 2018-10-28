import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {Post} from './post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export class Posts extends React.Component{
	publications(){
		if(this.props.posts){
			/*
			let posts = [];
			for(var i=0;i<this.props.posts.length;i++){
				let post = this.props.posts[i];
				posts.push(<Post html_content={post.html_content}></Post>);
			}
			return posts;*/
			return this.props.posts.map(post => {
				return <Post key={post.id} post={post} ></Post>;
			});
		}
		return "";
	}
	render(){
		return(
			<MuiThemeProvider>
				<div>
					{this.publications()}
				</div>
			</MuiThemeProvider>	
		);
	}
}