import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { Base,styles } from './base';
import reqwest from 'reqwest';

export class SignUp extends Base{
	submit(){
        if(this.syncConfirmPassword()){
    		reqwest({
    			url: '/users.json',
    			method: 'POST',
    			data:{
    				user:{
    					email: this.state.email,
    					password: this.state.password,
    					passwordConfirmation: this.state.passwordConfirmation
    				}
    			},
    			headers:{
    				'X-CSRF-Token':document.querySelector('meta[name="csrf-token"]').content
    			}
    		}).then(data =>{
    			console.log(data);
                this.reload();
    		}).catch(err => this.handleError(err));
        }
	}
    handleError(err){
        console.log(err);
        const jsonError = JSON.parse(err.response);
        const errors = jsonError.errors;
        let errorsResponse = [];
        for(let key in errors){
            errorsResponse.push(<li>{errors[key]}</li>)
        }
        this.setState({
            error: errorsResponse
        })
    }
	render(){
        return (
            <MuiThemeProvider>
                <Formsy.Form 
                    onValid={()=> this.enableSubmitBtn()}
                    onInvalid={()=> this.disableSubmitBtn()}
                    onValidSubmit={()=> this.submit()}
                    >
                    <div>
                        <ul>{this.state.error}</ul>
                    </div>
                    <div>
                        <FormsyText
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={(e)=>this.syncField(e,"email")}
                            name="email"
                            required
                            validations="isEmail" 
                            validationError="Ingresa un correo valido" 
                            floatingLabelText="Correo Electronico"/>
                    </div>
                    <div>
                        <FormsyText
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={(e)=>this.syncField(e,"password")}
                            name="password" 
                            required 
                            type="password"
                            floatingLabelText="Contraseña"  />
                    </div>
                    <div>
                        <FormsyText
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={
                                (e)=>this.syncField(e,"passwordConfirmation")
                            }
                            name="passwordConfirmation" 
                            required 
                            type="password"
                            floatingLabelText="Confirmar contraseña"  />
                    </div>
                    <div>
                        <RaisedButton
                            style={styles.buttontop}
                            backgroundColor={styles.buttonColor.color}
                            labelColor={styles.labelColor.color}
                            disabled={!this.state.canSubmit}
                            type="submit"
                            label="Crear cuenta" />
                        <a href='#'                 
							onClick={this.props.toggle}
							style={styles.leftSpace}>Ya tengo cuenta</a>
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}