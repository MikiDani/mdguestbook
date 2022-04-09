import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import loadDatabase from "../loadDatabase";
import { useAppContext } from "../availableVariables";

import loading from './loading.gif';

const Login = () => {
  
  const { userLogin, setUserLogin, user, setUser, userId, setUserId } = useAppContext();

  const {data, waiting, loadError} = loadDatabase(`http://localhost:8080/api/userslist`);

  const [userOrEmailValue, setUserOrEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [switchValue, setSwitchValue] = useState('false');
  const [errorValue, setErrorValue] = useState(false);

  const sendForm = () => {
    if (switchValue==='true') {     
      setErrorValue('Error in login!');
      for (let dataList of data) {
        if ((dataList.userName === userOrEmailValue || dataList.userEmail === userOrEmailValue) && dataList.userPassword === passwordValue) {
          setUser(dataList.userName);
          setUserId(dataList.id);
          setUserLogin(true);
          setErrorValue(false);
          setUserOrEmailValue('');
          setPasswordValue('');
          setSwitchValue('false');
        }
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

  const loginOut = () => {
    setUserLogin(false);
    setSwitchValue('false');
    setUserOrEmailValue('');
    setPasswordValue('');
    
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login-center">
        { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
        { loadError && <h4>{ loadError }</h4> }
        <form >
          { userLogin==false ? 
          (
          <Box sx={{ width: '100%' }} >
            <div className="buttonmargin"><TextField fullWidth
            onChange={(e)=>setUserOrEmailValue(e.target.value)}
            label="Username or E-mail"
            value={userOrEmailValue}/></div>

            <div className="buttonmargin"><TextField fullWidth 
            type="password"
            onChange={(e)=>setPasswordValue(e.target.value)}
            label="password" 
            value={passwordValue}/></div>

            <div className="buttonmargin">
              <label>I'm Not A Robot: </label>
              <Checkbox onClick={(e) => switchUse(e)} 
              label={switchValue} 
              value={switchValue} />
            </div>

            <div className="buttonmargin">
              <Button onClick={(e) => sendForm(e)} 
              variant="contained" disableElevation>Send
              </Button>
            </div>
          </Box>
          ) : ( 
          <div className="buttonmargin">
            <h3>Hello {user}!</h3>
            <Button 
            onClick={(e) => loginOut(e)} 
            variant="contained"
            disableElevation>Login Out
            </Button>
          </div>
          ) }
          { loadError && (<div className="buttonmargin"><div className="error"><h4>{loadError}</h4></div></div>) }
          { errorValue && (<div className="buttonmargin"><div className="error"><h4>{errorValue}</h4></div></div>) }
        </form>
      </div>
    </div>
   );
}

export default Login;