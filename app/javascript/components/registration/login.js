import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { Base,styles } from './base';
import reqwest from 'reqwest';

export class Login extends Base{
    submit(){
        reqwest({
            url: '/users/sign_in.json',
            method: 'POST',
            data:{
                user:{
                    email: this.state.email,
                    password: this.state.password
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
    handleError(err){
        const errorMessage = JSON.parse(err.response).error;
        this.setState({
            error: errorMessage
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
                        {this.state.error}
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
                        <RaisedButton
                            style={styles.buttontop}
                            backgroundColor={styles.buttonColor.color}
                            labelColor={styles.labelColor.color}
                            disabled={!this.state.canSubmit}
                            type="submit"
                            label="Iniciar Sesion" />
                        <a href='#' 
                            style={styles.leftSpace}
                            onClick={this.props.toggle}
                            >
                            Ya tengo cuenta
                        </a>
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}