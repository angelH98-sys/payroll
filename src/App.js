import './App.css';
import FormEmployee from './components/FormEmployee';
import TableEmployee from './components/TableEmployee';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Nómina de empleados</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to='/'>
                Empleados registrados
              </Link>
            </li>
            <li>
              <Link to='/formulario'>
                Nuevo empleado
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <div className="container">
        <Switch>
          <Route path='/' exact>
            <TableEmployee />
          </Route>
          <Route path='/formulario'>
            <FormEmployee />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;