import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();


  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    const success = createAccount();

    if (success) {
      navigate('/signin')
    } else {
      console.error('Erreur lors l\'inscription');
    }
  }

  //handle Signup API Integration here
  const createAccount= async ()=>{

    const api = `${process.env.REACT_APP_BACK_URL}`;
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.post(api + "/auth/register", signupState, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
      });

      // Vérification de la réponse du backend
      return resp.data.success === true;

    } catch (error) {
      console.error(error);
    }

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}