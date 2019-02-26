import React from 'react';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';


class IniciarSesion extends React.Component {
    constructor() {
      super();

      this.state = {
         errorCorreo: 'ocultar-elemento',
         errorContrasena: 'ocultar-elemento',
         errorFormulario: 'ocultar-elemento',
         mensajeErrorFormulario: 'Error desconocido',
         validarUsuario : false
      }

    }

    render(){
        const { validarUsuario } = this.state;
        if (validarUsuario) {
            return (
                <Redirect to="/catalogo"/>
            )
        }
        return (
            <div className="container-login">
                <div className="form-login">
                    <h1>Inicia Sesión</h1>
                    <form id="form-login">
                        <div className="campo-formulario">
                            <label htmlFor="correo-input">Correo Electrónico *</label>
                            <input type="text" id="correo-input" name="correo-input" required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"/>
                            <span className={this.state.errorCorreo}>El campo es requerido y/o El correo ingresado es incorrecto</span>
                        </div>
                        <div className="campo-formulario">
                            <label htmlFor="contrasena-input">Contraseña *</label>
                            <input type="password" id="contrasena-input" name="contrasena-input" required />
                            <span className={this.state.errorContrasena}>El campo es obligatorio</span>
                        </div>
                        <span className={this.state.errorFormulario}>{this.state.mensajeErrorFormulario}</span>
                        <button className="btn btn-success" type="button" onClick = {this.validarUsuario.bind(this)}>Ingresar</button>
                    </form>
                </div>
            </div>
        );
    }
    /**
     * Oculta los mensajes de error.
     */
    ocultarMsnError(){
        this.setState({
            errorCorreo: 'ocultar-elemento',
            errorContrasena: 'ocultar-elemento',
            errorFormulario: 'ocultar-elemento',
            mensajeErrorFormulario: 'Error desconocido'
        });
    }
    /**
     * Valida el usuario del formulario.
     */


    validarUsuario(){
        this.ocultarMsnError();
        let formularioLogin = document.getElementById("form-login");
        let inputCorreo = formularioLogin['correo-input'];
        if(!inputCorreo.checkValidity()){
            this.setState({
                errorCorreo: 'mostrar-elemento-block'
            });
        }
        let inputContrasena = formularioLogin['contrasena-input'];
        if(!inputContrasena.checkValidity()){
            this.setState({
                errorContrasena: 'mostrar-elemento-block'
            });
        }
        if(inputContrasena.checkValidity() && inputCorreo.checkValidity()){
            let correo = inputCorreo.value;
            let pass = inputContrasena.value;
            request
            .get ('https://tiendavirtual-ddb09.firebaseio.com/0/usuario.json')
            .set('Content-Type', 'application/json')
            .end((err, res)=>{

                let usuario = res.body;
                let usuarios = undefined;
                console.log(res.body);
                console.log(usuario[0]);

                for (var index = 0; index < usuario.length; index++) {
                    var element = usuario[index];

                    if(element.correo === correo && element.contrasena == pass){
                        usuarios = element;
                        break;
                    }
                }
                if(undefined == usuarios){
                    this.setState({
                        errorFormulario: 'mostrar-elemento-block',
                        mensajeErrorFormulario: 'Usuario no encontrado'
                    });
                }else{
                    this.setState({
                        validarUsuario: true
                    });
                }
            })

        }
    }
}

export default IniciarSesion;
