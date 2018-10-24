import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component{
    render(){
        return(
            <MuiThemeProvider>
                <Formsy.Form>
                    <div>
                        <FormsyText
                            name="email" requiered validations="isEmail" valdationError="Ingresa un correo valido" floatingLabel="Correo Electronico"
                        />
                    </div>
                    <div>
                        <FormsyText
                            name="password" requiered floatingLabel="Contraseña" type="password"
                        />
                    </div>
                    <div>
                        <RaisedButton
                            floatingLabel="Iniciar Sesion" type="submit"
                        />
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}