import { ApolloClient, from } from "@apollo/client";
import React from "react";
import {gql , useLazyQuery}  from '@apollo/client';
import { useRef } from "react";
import AddPatient from "./AddPatient";


const AddPatients = () =>{


    return(
        <div className="row">
            <AddPatient />
        </div>
    )
}

export default AddPatients;