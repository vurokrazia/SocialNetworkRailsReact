import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import { redA400, blueA400, pink500} from 'material-ui/styles/colors';
import reqwest from 'reqwest';
import {markdown} from 'markdown';
import {Uploader} from '../images/uploader';


const styles = {
	buttonStyle:{
		marginTop: '0.5em',
		marginBottom: '1.3em',
		color: 'white'
	},
	displayNoneStyle: {display:'none'}
}

export class PostForm extends React.Component{
	constructor(props){
		super(props);
		this.openFilePicker = this.openFilePicker.bind(this);
		this.storeImageID = this.storeImageID.bind(this);
		this.state = {
			markdown_content: '',
			html_content:'',
			error:'',
			images: [],
			ids:[]
		}
	}
	storeImageID(id){
		this.setState({
			ids: this.state.ids.concat([id])
		});
	}
	submit(){
		reqwest({
			url:'/posts.json',
			method: 'POST',
			data:{
				post:{
					markdown_content: this.state.markdown_content,
					html_content: markdown.toHTML(this.state.markdown_content),
					images_ids: this.state.ids
				}
			},
            headers:{
                'X-CSRF-Token':document.querySelector('meta[name="csrf-token"]').content
            }
		}).then(data =>{
			this.refs.markdown_content.resetValue();
            this.props.add(data);
            this.setState({
            	images:[],
            	ids:[]
            });
        }).catch(err => this.handleError(err));
	}
    handleError(err){
        const errorMessage = JSON.parse(err.response).error;
        this.setState({
            error: errorMessage
        })
        alert(this.state.error);
    }
    syncField(ev,fieldName){
        let element = ev.target;
        let value   = element.value;
        let jsonState = {};
        jsonState[fieldName] = value;
        this.setState(jsonState)
    }
    openFilePicker(){
    	this.refs.picker.click();
    }
    handleChangeFiles(e){
    	let files = e.target.files;
    	for(var i = 0;i < files.length;i++){
    		let file = files[i];
    		this.setState({
    			images: this.state.images.concat([file])
    		})
    	}
    }
    images(){
    	if(this.state.images.length > 0){
    		return this.state.images.map(image =>{
    			return <Uploader image={image} notify={this.storeImageID}></Uploader>
    		})
    	}else{
    		return "";
    	}
    }
	render(){
		return(
			<MuiThemeProvider>
                <Formsy.Form                     
                onValidSubmit={()=> this.submit()}>
                	<input onChange={(e)=>this.handleChangeFiles(e)} type="file" multiple="true" ref="picker" style={styles.displayNoneStyle} />
                	<FormsyText
	                	name="post[markdown_content]"
	                	ref="markdown_content"
	                	required
	                	onChange={(e)=>this.syncField(e,"markdown_content")}
	                	fullWidth={true}
	                	floatingLabelText="Write me!"
	                	multiLine={true}>
                	</FormsyText>
	                <div className="text-right">
	                	<FlatButton
	                	onClick={this.openFilePicker}
	                	icon={<ImageAddAPhoto/>}
	                	/>
	                	<RaisedButton
	                	backgroundColor={pink500}
	                	style={styles.buttonStyle}
	                	label="Publicar"
	                	type="submit"></RaisedButton>
	                </div>
                	<div>
                		{this.images()}
                	</div>
                </Formsy.Form>
            </MuiThemeProvider>
		);
	}
}