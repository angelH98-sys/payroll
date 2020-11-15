import React from 'react';
import { GetEmployees } from '../auxiliar/Query';

export default class TableEmployee extends React.Component {

    state = {
        employees: [],
        tableCharged: false
    }

    async reloadTable(){
        let response = await GetEmployees();
        let employees = [];
        response.docs.forEach(element => {
            employees.push({
                id: element.id,
                code: element.data().code,
                name: element.data().name,
                salary: element.data().salary,
                isss: element.data().isss,
                afp: element.data().afp,
                renta: element.data().renta,
                realSalary: element.data().realSalary,
                workedHours: element.data().workedHours
            });
        });
        this.setState({employees, tableCharged: true});
    }

    render(){
        this.reloadTable();
        return <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Horas laboradas</th>
                    <th>Salario</th>
                    <th>ISSS</th>
                    <th>AFP</th>
                    <th>Renta</th>
                    <th>Salario neto</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.employees.map(item => 
                        <tr key={item.id}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.workedHours}</td>
                            <td>${item.salary.toFixed(2)}</td>
                            <td>${item.isss.toFixed(2)}</td>
                            <td>${item.afp.toFixed(2)}</td>
                            <td>${item.renta.toFixed(2)}</td>
                            <td>${item.realSalary.toFixed(2)}</td>
                        </tr>
                        )
                }
            </tbody>
        </table>
    }
}