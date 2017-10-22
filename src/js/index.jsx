

import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import PatientList from './components/PatientList.jsx';
import MedicineComponent from './components/Medicine.jsx';
import SearchPatientComponent from './components/SearchPatients.jsx';
import ServerSideComponent from './components/ServerSide.jsx';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/index.less';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <div><PatientList/></div>
    },
    {
        path: '/medicine',
        main: () => <h2><MedicineComponent/></h2>
    },
    {
        path: '/search',
        main: () => <h2><SearchPatientComponent/></h2>
    },
    {
        path: '/server',
        main: () => <h2><ServerSideComponent/></h2>
    }
]
class App extends React.Component {
    render () {
        return (
            <Router>
                <div className="entire-container">
                    <div className="col-md-2 sidebar">
                        <ul>
                            <li>
                                <i className="fa glyphicon glyphicon-user"></i>
                                <Link to="/">Manage Patients</Link>
                            </li>
                            <li>
                                <i className="fa glyphicon glyphicon-heart-empty"></i>
                                <Link to="/medicine">Manage Medicine</Link>
                            </li>
                            <li>
                                <i className="fa glyphicon glyphicon-search"></i>
                                <Link to="/search">Search Patient</Link>
                            </li>
                            <li>
                                <i className="fa glyphicon glyphicon-filter"></i>
                                <Link to="/server">Server side</Link>
                            </li>
                        </ul>

                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.sidebar}
                            />
                        ))}
                    </div>

                    <div className="assignment-container">
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </div>
                </div>
            </Router>

        );
    }
}

render(<App/>, document.getElementById('app'));