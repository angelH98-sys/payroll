import React from "react";
import {CreateEmployee, GetEmployeeByCode} from '../auxiliar/Query';
import M from 'materialize-css';

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
        salary: 0,
        isss: 0,
        afp: 0,
        renta: 0,
        realSalary: 0,
        validForm: false
    }

    onSubmit = async () => {
        if(this.state.validForm){

            this.setState({
                validForm: false
            });

            await this.calculateSalary();
            
            if(await this.checkCode()){
                let result = await CreateEmployee({
                    code: this.state.code.value,
                    name: this.state.name.value,
                    workedHours: this.state.workedHours.value,
                    salary: this.state.salary,
                    isss: this.state.isss,
                    afp: this.state.afp,
                    renta: this.state.renta,
                    realSalary: this.state.realSalary
                });

                if(result){
                    M.toast({
                        html: 'Empleado registrado'
                    });
                }else{
                    M.toast({
                        html: 'No fue posible registrar el empleado'
                    });
                }
            }else{
                M.toast({
                    html: 'Código de empleado no disponible'
                });
                document.getElementById('code').classList.add('invalid');
                document.getElementById('code').focus();
            }
            
            
        }else{
            M.toast({
                html:'No es posible crear el empleado'
            });
            this.setState({
                validForm: false
            });
        }
    }

    calculateSalary(){
        let workedHours = parseInt(this.state.workedHours.value);
        let salary = 0;

        if(workedHours > 200 && workedHours <= 250){

            salary = 2020;//Salario de las primeras 200 horas
            let leftHours = workedHours - 200;
            salary += (leftHours * 12.50);

        }else if(workedHours > 160 && workedHours <= 200){

            salary = 1560;//Salario de las primeras 160 horas
            let leftHours = workedHours - 160;
            salary += (leftHours * 11.50);

        }else{
            salary = workedHours * 9.75;
        }
        
        let realSalary = salary;

        let isss = salary * 0.0525;
        realSalary -= isss;
        let afp = salary * 0.0688;
        realSalary -= afp;
        let renta = salary * 0.1;
        realSalary -= renta;

        this.setState({salary, isss, afp, renta, realSalary});
    }

    async checkCode(){
        let response = await GetEmployeeByCode(this.state.code.value);
        
        if(response.empty){
            return true;
        }else{
            return false;
        }
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
                                min="1" step="1" mas="250"
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