import React from 'react';
import WebpackerReact from 'Webpacker-react';
import { Posts } from '../components/posts/post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class PostGroup extends React.Component{
	render(){
		return (
			<MuiThemeProvider>
				<Post htmlContent="Hola mundo"></Post>
			</MuiThemeProvider>
		);
	}
}
WebpackerReact.setup({PostGroup});