import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EmplyeeList from './components/EmplyeeList';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       
        <EmplyeeList></EmplyeeList>
      </Provider>
    );
  }
}

export default App;
