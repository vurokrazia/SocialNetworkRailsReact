import React from 'react';
import { blueA400, redA400 } from 'material-ui/styles/colors';
export class Base extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            canSubmit: true,
            email: '',
            password: '',
            passwordConfirmation: '',
            error: ''
        };
    }
    reload(){
    	window.location.href = window.location.href;
    }
    syncConfirmPassword(){
        if (this.state.password != this.state.passwordConfirmation){
        	this.disableSubmitBtn();
        	this.state.error = "Las contraseñas no coinciden";
        	return false;
        }else{
        	return true;
        }
    }
    syncField(ev,fieldName){
        let element = ev.target;
        let value   = element.value;
        let jsonState = {};
        jsonState[fieldName] = value;
        this.setState(jsonState)
    }
    enableSubmitBtn(){
        this.setState({
            canSubmit: true
        })
    }
    disableSubmitBtn(){
        this.setState({
            canSubmit: false
        })
    }
}
export const styles = {
    buttontop:{
        marginTop: '1em'
    },
    buttonColor:{
    	color:redA400,
    },
    labelColor:{
        color:"#ffffff"
    },
    underlineStyle:{
        borderColor: blueA400,
    },
    floatingLabelFocusStyle:{
        color: blueA400,
    },
    leftSpace:{
        marginLeft: '1em'
    }
}
