import React, { useState } from "react";
import { gql, useMutation,  useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";


const CREATE_VACCINE_MUTATION = gql`
 mutation onCreateVaccineMutation($PatientName : String! , $DOB : String!, $Vaccination : String!, $BrandName: String!, $GivenAt:String!){
    createVaccine(data:{
        PatientName : $PatientName,
        DOB :         $DOB,
        Vaccination : $Vaccination,
        BrandName : $BrandName,
        GivenAt : $GivenAt,
        
    }){
        PatientName , DOB , Vaccination , BrandName , GivenAt 
    }
}`
 const GET_PATIENT_NAME = gql`
 query{
    patients{PatientName }
  }
  
  `

   
const AddVaccine = () =>{
     
     


    const [vaccineState , setVaccineState] = useState<{PatientName : string, DOB : string, Vaccination : string, BrandName: string, GivenAt:string}>({
        PatientName : '' , DOB : '', Vaccination : '', BrandName: '', GivenAt:'',
        
    })

    let [createVaccineCallback , {error , loading , data}]= useMutation(CREATE_VACCINE_MUTATION,{
      variables :{
        PatientName : '' , DOB : '', Vaccination : '', BrandName: '', GivenAt:''
        
      }  
    })


    const createVaccineHandler =(event : React.FormEvent) => {
        event.preventDefault()
        createVaccineCallback({
            variables : {
                PatientName : vaccineState.PatientName,
                DOB : vaccineState.DOB,
                Vaccination: vaccineState.Vaccination,
                BrandName : vaccineState.BrandName,
                GivenAt: vaccineState.GivenAt,
        
            }
        })
    }

    const PatientChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = event =>{
        setVaccineState ({...vaccineState , PatientName : event.target.value})
    }
    const DOBChangeHandler : React.ChangeEventHandler<HTMLInputElement> = event =>{
        setVaccineState ({...vaccineState , DOB : event.target.value})
    }
    const vaccinationChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = event =>{
        setVaccineState ({...vaccineState , Vaccination : event.target.value})
    }
    const BrandNameChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = event =>{
        setVaccineState ({...vaccineState , BrandName : event.target.value})
    }
    const GivenAtChangeHandler : React.ChangeEventHandler<HTMLInputElement> = event =>{
        setVaccineState ({...vaccineState , GivenAt : event.target.value})
    }


 const {error: vacc, data:vacci, loading:vaccin}= useQuery(GET_PATIENT_NAME)
console.log(vacci?.patients)
 






    return (
        <div className="row">
            <div className="col-6  offset-3 ">
                <div className="card">
                    <h2>Add Vaccine Details</h2>
                </div>
                <br/>
                <br/>
                <form>
                        
                        <div className="form-group">

                            <label htmlFor="PatientName">PatientName : </label>
                              {/* <input type="text" name="PatientName" className="form-control" value={vaccineState.PatientName} onChange={PatientChangeHandler} />    */}
                            <select onChange={PatientChangeHandler} className="form-control">{vacci?.patients.map((p:any)=>(
                                <option key={p.PatientName} value={p.PatientName}>{p.PatientName}</option>
                            ))}</select>

                     <div className="form-group">
                  <label htmlFor="DOB" >DOB : </label>
                        <input type="Date"  name="DOB" className="form-control" value={vaccineState.DOB} onChange={DOBChangeHandler} />

                  </div>
                        
 

                        {/*Vaccination*/}
                        <div  className="form-group>">

                        <label htmlFor="Vaccination">Vaccination : </label>
                        <select name="Vaccination" value={vaccineState.Vaccination} onChange={vaccinationChangeHandler}>
                        <option value="-" >-</option>
                        <option value ="dose1">Dose1</option>
                        <option value ="dose2">Dose2</option>
                        </select>

                        </div>

                        {/* Brand name */}
                           <div className="form-group">
                           <label htmlFor="BrandName">Brand Name : </label>
                        <select name="BrandName" value={vaccineState.BrandName} onChange={BrandNameChangeHandler}>
                           <option value="-">-</option>
                           <option value="CoVaccine">CoVaccine</option>
                           <option value="CovidSheild">CovidSheild</option>
                           </select>
                           </div>
                        
                
                     {/* Give At */}
<br/>
                  <label htmlFor="GivenAt" >Given At : </label>
                  <input type="text" name="GievnAt" className="form-control" value={vaccineState.GivenAt} onChange={GivenAtChangeHandler}/>
                      </div>
                      
                      <button className="btn btn-dark" onClick={createVaccineHandler}>Save</button>


                
                    

</form>
                
                    </div>
                </div>
    

            



        
    )

}

export default AddVaccine;