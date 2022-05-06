/* import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

 */
  import React  from "react";
import { Route, Redirect , Switch}  from "react-router-dom";
import Header from "./Components/Header/header";
import AddPatient from "./Components/Patients/AddPatient";
import AddVaccine from "./Components/Administrator/AddVaccination"

import { Fragment } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import VaccineCard from "./Components/Administrator/VaccinationCard";
 
  
const  client = new ApolloClient({
  uri : "https://vp-bri-graph-app.herokuapp.com/gq",
  cache : new InMemoryCache()
})

function App() {
  return(
    <Fragment>
       <div className="container">
        <Header />
      </div>  

      <div className="container">
        <Switch>

        <Route path='/' exact> 

             <Redirect to='addpatient'/>
            </Route>
         
          <Route path='/addpatient' >
            <ApolloProvider client={client}>
            <AddPatient />
            </ApolloProvider>
            
          </Route> 
          
          <Route path="/addvaccination" >
            <ApolloProvider client={client} >
              <AddVaccine />
              
            </ApolloProvider>

          </Route>
          <Route path="/vaccinecard">
            <ApolloProvider client={client} >
              <VaccineCard />
            </ApolloProvider>
          </Route> 
        </Switch>
      </div>
    </Fragment>
  )
}
  export default App;