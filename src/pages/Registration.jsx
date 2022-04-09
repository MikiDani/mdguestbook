import { useState } from "react";
import loadDatabase from "../loadDatabase";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import loading from './loading.gif';

const Registration = () => {

  const { data, waiting, loadError } = loadDatabase(`http://localhost:8080/api/userslist`);

  const navigate = useNavigate();

  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [switchValue, setSwitchValue] = useState('false');
  const [errorValue, setErrorValue] = useState(false);
  const [registrationOk, setRegistrationOk] = useState(false);

  const doneFunction = () => {
    setErrorValue(false);
    setUserNameValue('');
    setEmailValue('');
    setPasswordValue('');
    setSwitchValue('false');
    setRegistrationOk(false);
    navigate('/login');
  }

  function emailCheck(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const sendForm = () => {
    if (switchValue==='true') {
      if (userNameValue && emailValue && passwordValue && repeatPasswordValue) {
        if (userNameValue.length>5 && userNameValue.length<11) {
          if(emailCheck(emailValue)) {
            let errorText=[];
            let registration=true;
            for (let dataList of data) {
              if (dataList.userName === userNameValue) { 
                errorText.push('A név már regisztrálva van!'); 
                registration=false; 
              }
              if (dataList.userEmail === emailValue) { 
                errorText.push('Az e-mail már regisztrálva van!');
                registration=false;
              }
            }
            if (registration===true) {
              if (passwordValue.length>5) {
                if (passwordValue === repeatPasswordValue) {
                  /* Regisztration! */
                  const newUserData = 
                    {
                      "userName": userNameValue,
                      "userEmail": emailValue.toLowerCase(),
                      "userPassword": passwordValue,
                    };
                  const response = fetch(`http://localhost:8080/api/userslist/add`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(newUserData)
                  })
                  .then(response => {
                    if (response.status===200) {
                      setRegistrationOk(true);
                    } else {
                      errorText.push('An error occurred during registration!');
                    }
                  })

                } else {
                  errorText.push('The passwords do not match!');
                }
              } else {
                errorText.push('The password must be at least 6 characters long!');
              }
            }
            setErrorValue(errorText);
          } else {
            setErrorValue('Incorrect email format!');
          }
        } else {
          setErrorValue('Username must be between 6 and 10 characters long!');
        }
      } else {
        setErrorValue('You must fill in the fields!');
      }
    } else {
      setErrorValue('Robot Switch!');
    }
  }

  const switchUse = (e) => {
    if (switchValue==='false') {
      setSwitchValue('true');
      setErrorValue(false);
    } else {
      setSwitchValue('false');
      setErrorValue('Robot Switch!');
    }
  }

  return (
    <div className="registration">
    <h2>Registation</h2>
    <div className="registration-center">
      { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
      { loadError && <h4>{ loadError }</h4> }
      <form >
        { registrationOk===false ? 
        (
        <Box sx={{ width: '100%' }} >
          <div className="buttonmargin">
            <TextField fullWidth
            onChange={(e)=>setUserNameValue(e.target.value)}
            label="Username"
            value={userNameValue}/>
          </div>

          <div className="buttonmargin">
            <TextField fullWidth
            onChange={(e)=>setEmailValue(e.target.value)}
            label="E-mail"
            value={emailValue}/>
          </div>

          <div className="buttonmargin">
            <TextField fullWidth 
            type="password"
            onChange={(e)=>setPasswordValue(e.target.value)}
            label="password"
            value={passwordValue}/>
          </div>

          <div className="buttonmargin">
            <TextField fullWidth 
            type="password"
            onChange={(e)=>setRepeatPasswordValue(e.target.value)}
            label="repeat password"
            value={repeatPasswordValue}/>
          </div>

          <div className="buttonmargin">
            <label>I'm Not A Robot: </label>
            <Checkbox 
            onClick={(e) => switchUse(e)} 
            label={switchValue} 
            value={switchValue} />
          </div>
          
          <div className="buttonmargin">
            <Button 
            onClick={(e) => sendForm(e)} 
            variant="contained" 
            disableElevation>Send
            </Button>
          </div>
        </Box>
        ) : (
        <>
          <div className="buttonmargin"><div className="ready"><h4>Registration is done!</h4></div></div>
          <div className="buttonmargin">
            <Button 
            onClick={(e) => doneFunction(e)} 
            variant="contained"
            disableElevation>Done
            </Button>
          </div>
        </>
        )}
        {errorValue && (<div className="buttonmargin"><div className="error"><h4>{errorValue}</h4></div></div>)}
      </form>
    </div>
  </div>
  );
}

export default Registration;