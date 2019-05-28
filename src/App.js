import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
import { Navbar } from 'react-bootstrap';

const App = () => (
  <div>
    <Navbar >
      <Navbar.Header>
       <Navbar.Brand>
         <a href="/">Icon Sizer</a>
       </Navbar.Brand>
     </Navbar.Header>
    </Navbar>
    <Main />
  </div>
);

export default App;
