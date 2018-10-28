import React from 'react';
import reqwest from 'reqwest';
const styles = {
	image:{
		height: "150px"
	},
	progressBar:{
		height:"22px",
		width: "100px",
		backgroundColor:'#222',
		position:'relative'
	}		
}
export class Uploader extends React.Component{
	constructor(props){
			super(props);
			this.state = {
				progress: 0,
				id:0,
				imageURL:""
			}
		}
	upload(){
		let xhr = new XMLHttpRequest();
		xhr.open("POST","/images.json");
		xhr.onload = (ev)=>{
			if(ev.lengthComputable){
				let progress = (ev.loaded / ev.total)*100;
				this.setState({
					progress: progress
				});
				console.log(progress);
			}
		}
		xhr.onreadystatechange = (ev) => {
			if(xhr.readyState == 4){
				console.log('Fin uploaded');
				this.setState({
					progress: 100
				});
				let response = JSON.parse(xhr.response);
				this.props.notify(response.id);
				console.log(response);
			}
		};
		xhr.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').content);
		xhr.send(this.formData());
	}
	formData(){
		let formData = new FormData();
		formData.append('image[image_file]',this.props.image);
		return formData;
	}
	image(){
		if(this.state.imageURL){
			return <img style={styles.image} src={this.state.imageURL}/>
		}else{
			return"";
		}
		
	}
	componentDidMount(){
		this.getImagerUrl();
		this.upload();
	}
	getImagerUrl(){
		let imageURL = URL.createObjectURL(this.props.image);
		this.setState({
			imageURL: imageURL
		});
	}
	render(){
		return(
			<div>
				<div>{this.image()}</div>	
				<div style={styles.progressBar}>
					<div style={
						{
							position:"absolute",
							height:"100%", 
							width:(this.state.progress)+"%",
							backgroundColor:"#2962ff",color:"white"}
						}
						>
						<p>{this.state.progress}</p>
					</div>
				</div>
			</div>

		);
	}
} 