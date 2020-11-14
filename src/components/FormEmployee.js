import React from "react";

export default class FormEmployee extends React.Component{

    control = {
        value: '',
        state: 'invalid',
        error: ''
    }

    state = {
        code: this.control,
        name: this.control,
        workedHours: this.control,
        validForm: false
    }

    onSubmit = e => {
        alert("wow");
    }

    onValidate = e => {

        let control = e.target.id;
        let value = e.target.value;
        let state = 'invalid';
        let error = '';
        
        if(value.trim().length > 0){

            let validValue = true;
            if(control == 'workedHours'){
                validValue = this.validateHours(value);
            }

            if(validValue){
                document.getElementById(control).classList.remove('invalid');
                document.getElementById(control).classList.add('valid');
                state = 'valid';
            }else{
                document.getElementById(control).classList.add('invalid');
                error = 'Campo inválido';
            }

        }else{
            document.getElementById(control).classList.add('invalid');
            error = 'Campo requerido';
        }

        this.setState({ [control]: {value, error, state} });
        this.checkForm();
    }

    validateHours(hours){
        
        if(!isNaN(hours) && hours > 0 && Number.isInteger(parseInt(hours))){
            document.getElementById('workedHours').value = parseInt(hours);
            return true;
        }else{
            return false;
        }
    }

    checkForm = () => {
        
        if(this.state.code.state == 'valid' &&
            this.state.name.state == 'valid' &&
            this.state.workedHours.state == 'valid'){
            
            this.setState({
                validForm: true
            });
        }
    }

    render() {
        return (
            <div className="row">
                <form className="col xl6 l8 m10 s12" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field s12">
                            <input type="text" id="code" 
                                onBlur={this.onValidate} 
                                onChange={this.onValidate}/>
                            <label htmlFor="code">Código</label>
                            <span className="helper-text" 
                                data-error={this.state.code.error} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field s12">
                            <input type="text" id="name" 
                                onBlur={this.onValidate}
                                onChange={this.onValidate}/>
                            <label htmlFor="name">Nombre</label>
                            <span className="helper-text" 
                                data-error={this.state.name.error} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field s12">
                            <input type="number" id="workedHours" 
                                min="1" step="1"
                                onBlur={this.onValidate}
                                onChange={this.onValidate}/>
                            <label htmlFor="workedHours">
                                Horas trabajadas en el mes
                            </label>
                            <span className="helper-text" 
                                data-error={this.state.workedHours.error} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="s12">
                            <a className="waves-effect waves-light btn" 
                                disabled={!this.state.validForm}
                                onClick={this.onSubmit}>
                                Enviar
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}