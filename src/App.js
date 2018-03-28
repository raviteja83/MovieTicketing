import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import FormContainer from './container/FormContainer';
import SeatContainer from './container/SeatContainer';
import TableContainer from './container/TableContainer';

import './app.css';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <h3>MOVIE SEAT RESERVATION </h3>
                    <FormContainer />
                    <SeatContainer />
                    <TableContainer />
                </div>
            </Provider>
        );
    }
}

export default App;
