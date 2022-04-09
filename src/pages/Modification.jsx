import { useState, useEffect } from "react";
import loadDatabase from "../loadDatabase";
import { useAppContext } from "../availableVariables";
import { useNavigate, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import loading from './loading.gif';

const Modification = () => {

  const { data, waiting, loadError } = loadDatabase(`http://localhost:8080/api/userslist`);

  const { setUserLogin, user, setUser, userId, setUserId } = useAppContext();

  const navigate = useNavigate();

  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [loadUserPassword, setLoadUserPassword] = useState('');
  const [loadUserEmail, setLoadUserEmail] = useState('');

  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [errorValue, setErrorValue] = useState(false);
  const [deleteUser, setdeleteUser] = useState(false);
  const [modOk, setModOk] = useState(null);

  useEffect(() => {
    if (user===false) { navigate('/'); }
    if (data) {
      let userData=data.find((user) => user.id === userId);
      setUserNameValue(userData.userName);
      setEmailValue(userData.userEmail);
      setLoadUserPassword(userData.userPassword);
      setLoadUserEmail(userData.userEmail);
    }
  }, [data]);

  function emailCheck(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  const userNameCheck = () => {
    for (let userList of data) {
      if (userList.userName === userNameValue) {
        if (userNameValue != user) {
          return false;
        }
      }
    }
    return true;
  }

  const emailCheckDatabase = () => {
    for (let userList of data) {
      if (userList.userEmail === emailValue) {
        if (emailValue != loadUserEmail) {
          console.log('Más emailját találta!');
          return false;
        }
      }
    }
    return true;
  }

  const sendForm = (func) => {

    if (oldPasswordValue===loadUserPassword) {
      if (userNameCheck()) {
        if (emailCheck(emailValue)) {
          if (emailCheckDatabase()) {
            if (userNameValue.length>5 && userNameValue.length<10) {
              if (func==='del') {
                //delete user
                const response = fetch(`http://localhost:8080/api/userslist/deleteuser`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId: userId})
                })
                .then(response => {
                  if (response.status===200) {
                    setUserLogin(false);
                    setUser(false);
                    setUserId(null);
                    setdeleteUser(true);
                    }
                  })
                } else if (func==='mod') {
                  //if modification user password
                  setErrorValue('');
                  let passwordWrite;
                  let userBurn=false;
                  if ( passwordValue.length>0 ) {
                    if ( passwordValue===repeatPasswordValue) {
                      if (passwordValue.length>5) {
                        passwordWrite=passwordValue;
                        setErrorValue('');
                        userBurn=true;
                      } else { setErrorValue('the password must be at least 6 characters long!'); userBurn=false; }
                    } else { setErrorValue('The two passwords do not match!'); userBurn=false; }
                  } else { passwordWrite=oldPasswordValue; userBurn=true; }
                  //modification user
                  if (userBurn) {
                    const lowerEmail=emailValue.toLowerCase();
                    const userModification = {
                      "id": userId,
                      "userName": userNameValue,
                      "userEmail": lowerEmail,
                      "userPassword": passwordWrite
                    }
                    const response = fetch(`http://localhost:8080/api/userslist/usermodification/`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userModification)
                    })
                    .then(response => {
                      if (response.status===200) {
                        setModOk('The modification is done!');
                        setErrorValue('');
                        setUser(userNameValue);
                      } else {
                        setErrorValue('An error occurred while modification!');
                      }
                    })
                  }
                }
            } else { setErrorValue('Username must be between 6 and 10 characters long!'); }
          } else { setErrorValue('The e-mail already exists in the database!'); }
        } else { setErrorValue('Invalid e-mail format!'); }
      } else { setErrorValue('A felhasználónév már regisztrálva van!!!'); }
    } else { setErrorValue('The passwords is not correct!'); }
  }

  return (
  <div className="modification">
    <div className="modification-center">
      <h2>User modification</h2>
      { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
      { loadError && <h4>{ loadError }</h4> }
      { !deleteUser ?
        (
          data && (
          modOk ? ( 
            <>
            <div className="ready"><h4>{ modOk }</h4></div>
            <div className="buttonmargin">
            <Link className="underlineoff" to="/"><Button variant="contained" disableElevation>Ok</Button></Link>
            </div>
            </>
          ) : (
            <form>
              <Box sx={{ width: '100%' }} >
                <label>New username:</label>
                <div className="buttonmargin">
                  <TextField fullWidth
                  onChange={(e)=>setUserNameValue(e.target.value)}
                  label="username"
                  value={userNameValue}/>
                </div>

                <label>New e-mail name:</label>
                <div className="buttonmargin">
                  <TextField fullWidth
                  onChange={(e)=>setEmailValue(e.target.value)}
                  label="e-mail"
                  value={emailValue}/>
                </div>

                <label>Password:</label>
                <div className="buttonmargin">
                  <TextField fullWidth 
                  type="password"
                  onChange={(e)=>setOldPasswordValue(e.target.value)}
                  label="oldpassword"
                  value={oldPasswordValue}/>
                </div>

                <div className="newpassword">
                  
                  <label>New password:</label>
                  <div className="buttonmargin">
                    <TextField fullWidth 
                    type="password"
                    onChange={(e)=>setPasswordValue(e.target.value)}
                    label="new password"
                    value={passwordValue}
                    color="secondary"/>
                  </div>

                  <label>Repaeat new password:</label>
                  <div className="buttonmargin">
                    <TextField fullWidth 
                    type="password"
                    onChange={(e)=>setRepeatPasswordValue(e.target.value)}
                    label="repeat new password"
                    value={repeatPasswordValue}
                    color="secondary"/>
                  </div>

                </div>
                <div className="buttonmargin">
                  <Button 
                  onClick={(e) => sendForm('mod')}
                  variant="contained" 
                  disableElevation>Modification
                  </Button>
                </div>

                <label>Delete my profile:</label>
                <div className="buttonmargin">
                  <Button 
                  onClick={(e) => sendForm('del')}
                  variant="contained" 
                  color="secondary"
                  disableElevation>Delete User
                  </Button>
                </div>
              </Box>

              { errorValue && (<div className="buttonmargin"><div className="error"><h4>{errorValue}</h4></div></div>) }
            </form>
            )
          )
        ) : (
          <div className="error"><h4>The user is deleted!</h4></div>
        ) }
      </div>
    </div>
  );
}

export default Modification;