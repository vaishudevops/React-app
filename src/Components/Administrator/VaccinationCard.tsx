
import React from "react";
import {gql , useQuery} from "@apollo/client";
import "./vacci.css";



const FETCH_CARD = gql`
query{
    vaccinations{
        PatientName 
         DOB 
        BrandName 
         Vaccination 
         GivenAt 
    }
}`



const VaccineCard =() =>{
    const { data : vacci} = useQuery(FETCH_CARD)

    return(
      <div className="container">
        <br/>
        <br/>
        <br/>
          <table>
          <tr>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>BrandNmae</th>
              <th>Vaccination</th>
              <th>GivenAt</th>

            </tr>

          <td>
              {vacci?.vaccinations.map((p: any)=>(
                  <option key={p.PatientName} value={p.PatientName}>{p.PatientName}</option>
              ))}
          </td>
          <td>
               
          {vacci?.vaccinations.map((p: any)=>(
                  <option key={p.DOB} value={p.DOB}>{p.DOB}</option>
              ))}

          </td>

          
          <td>
          {vacci?.vaccinations.map((p: any)=>(
                  <option key={p.BrandName} value={p.BrandName}>{p.BrandName}</option>
              ))}
 
          </td>
          <td>
          {vacci?.vaccinations.map((p: any)=>(
                  <option key={p.Vaccination} value={p.Vaccination}>{p.Vaccination}</option>
              ))}

          </td>
          <td>
          {vacci?.vaccinations.map((p: any)=>(
                  <option key={p.GivenAt} value={p.GievnAt}>{p.GivenAt}</option>
              ))}

          </td>
          </table>
         
        
      </div>
    )
    
    

}  

export  default VaccineCard; 