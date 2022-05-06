
import React , {useState , useEffect} from "react";
import {gql , useMutation} from "@apollo/client";
import {useHistory } from "react-router-dom";
import classes from './AddPatient.module.css'



  
const CREATE_USER_MUTATION = gql`
mutation onCreatePatientMutation($PatientName : String! , $DOB : String! ,$Gender : String!, $BloodGroup:String!, $Weight:String!, $Height : String! ){
    createPatient(data:{
        PatientName : $PatientName,
        DOB : $DOB,
        Gender : $Gender,
        BloodGroup : $BloodGroup,
        Height: $Height,
        Weight: $Weight
    }){
        PatientName , DOB , Gender , BloodGroup , Weight , Height 
    }
}`






const AddPatient = () =>{

    const history = useHistory();

const [patientState , setPatientState] = useState<{PatientName : string ,DOB : string , Gender : string ,BloodGroup : string, Height: string , Weight: string }>({

     PatientName :'', DOB :'' , Gender :'' , BloodGroup :'', Height :'' , Weight :'' 

  })
 const[enterdName , setEnterdName] = useState<string>('')

 const [nameInputBlur , setNameInputBlur] =useState<boolean>(false);
 const [showPrompt , setShowPrompt] = useState<boolean>(false);
 const [formState , setFormState] = useState<boolean>(false);


let formClass = 'form-control';
let nameClass = 'form-control';

let nameIsValid = patientState.PatientName.trim() !=='';
let  nameIsValidAndBlurred = !nameIsValid && nameInputBlur;

useEffect(() =>{
    if(enterdName.trim() !== '' && enterdName.trim()){

       setFormState(true)
          }else{
              setFormState(false)
          }
},[enterdName])


if(nameInputBlur){
    nameClass = nameIsValid ?
                        `${classes['valid']}` :
                        `${classes['invalid']}` ;
}


let [createPatientCallback , {error , loading , data}] = useMutation(CREATE_USER_MUTATION,{
    variables : {
        PatientName : '',
        DOB : '',
        Gender : '',
        BloodGroup : '',
        Weight : '',
        Height : '',
    }
})




const createPatientHandler = (event : React.FormEvent) => {
    event.preventDefault()
    createPatientCallback({
        variables : {
            PatientName : patientState.PatientName,
            DOB : patientState.DOB,
            Gender : patientState.Gender,
            BloodGroup : patientState.BloodGroup,
            Weight : patientState.Weight,
            Height : patientState.Height,
        }
     //})
   // .then(res =>{
     //alert("Detals Saved Sucessfully")
    }).catch(error =>{
         alert("data saved sucessfully")
     })
    
}

    
  const PatientNameHandler : React.ChangeEventHandler<HTMLInputElement> = event => {
      setPatientState({...patientState , PatientName : event.target.value})
  }

  const DOBHandler : React.ChangeEventHandler<HTMLInputElement> =event =>{
      setPatientState ({...patientState , DOB : event.target.value})
  }

  const GenderHandler : React.ChangeEventHandler<HTMLSelectElement> = event =>{
      setPatientState({...patientState , Gender : event.target.value})
  }

const BloodGroupHandler : React.ChangeEventHandler<HTMLSelectElement> = event =>{
    setPatientState({...patientState , BloodGroup : event.target.value})
} 
const WeightHandler : React.ChangeEventHandler<HTMLInputElement> = event =>{
    setPatientState ({...patientState , Weight : event.target.value})
}
const HeightHandler : React.ChangeEventHandler<HTMLInputElement> = event =>{
    setPatientState ({...patientState , Height : event.target.value})
};


const nameBlurHandler = () =>{
    setNameInputBlur(true)
}
 const cancelEventHandler : React.FormEventHandler = (event) =>{
     event.preventDefault()
     history.replace("/")
 }



   
if(error){
    return <p>Something went wrong</p>
}

return (


   <div className="row">
       
       <div className="col-6 offset-3">
           <div className="card">
               <h3 className="text-center">Create Patient</h3>
               </div>
               
           <form> 
           <div className="card-body">
               <div className="form-group">

                <label htmlFor="PatientName">Patient Name : </label>
                <input  type="text" name="PatientName" className="form-control" 
                value={patientState.PatientName }   onChange={PatientNameHandler} onBlur={nameBlurHandler} />
                {nameInputBlur && nameIsValidAndBlurred && <p className="alert alert-danger">Name is mandatory</p>}
                 
            
        
               </div>
            
            
               <div className="form-group">
                   <label htmlFor="DOB">Date Of Birth :  </label>
                   <input type="Date" name="DOB" className="form-control" value={patientState.DOB} onChange={DOBHandler} />

               </div>
               <div className="form-group">
                   <label htmlFor="Gender">Gender :  </label>
                   <select name="Gender" value={patientState.Gender}  onChange={GenderHandler}>
                       <option value="-">-</option>
                   <option value="female">Female</option>
                   <option value="Male">Male</option>
                   <option value="others">Others</option>

                   </select>

               </div>
               <div className="form-group" >
                   <label htmlFor="BloodGroup">BloodGroup : </label>
                   <select name="BloodGroup" value={patientState.BloodGroup} onChange={BloodGroupHandler}>
                   <option value="-">-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>

                   </select>
               </div>
               <div className="form-group">
                   <label htmlFor="Weight">Weight : </label>
                   <input type="Number" name="weight" className="form-control" value={patientState.Weight} onChange={WeightHandler}/>
               </div>
                 <div className="form-group">
                   <label htmlFor="Height">Height : </label>
                   <input type="Number" name="Height" className="form-control" value={patientState.Height} onChange={HeightHandler}/>
               </div>
              <br/>
              <button   className={classes['my-button']}  type="submit" onClick={createPatientHandler}>Save</button>
              

               </div>
               <div className="col-6">
                    <button type="button" className=" form-control btn btn-block btn-danger"  onClick={cancelEventHandler}>Cancel</button>
            </div>
               </form>
               <br/>

               
  </div>
  
  </div>
       
)
}


export default AddPatient;



