import db from './Firestore';

export function CreateEmployee(data){
    return db.collection('Employees').add(data);
}

export function GetEmployeeByCode(code){
    return db.collection('Employees').where('code', '==', code).get();
}

export function GetEmployees(){
    return db.collection('Employees').orderBy('realSalary', 'desc').get();
}

export default CreateEmployee;