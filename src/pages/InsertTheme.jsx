import { useState } from "react";
import { useAppContext } from '../availableVariables';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const InsertTheme = () => {

  const { userId } = useAppContext();
  const navigate = useNavigate();

  const [newThemeValue, setNewThemeValue] = useState('');
  const [newThemeTextValue, SetNewThemeTextValue] = useState('');

  const [errorText, setErrorText] = useState(false);
  const [insertOk, setinsertOk] = useState(false);

  const InsertThemeFunction = () => {
    let minChar = 10;
    if (newThemeValue.length>minChar) {
      if (newThemeTextValue.length>minChar) {
        const newThemeSend = 
        {
          "bookName" :  newThemeValue,
          "bookUserId" : userId,
          "messageDatabase" : [
            {
              "messageText": newThemeTextValue,
              "messageUserId": userId
            }
          ]
        }
        const response = fetch(`http://localhost:8080/api/bookslist/add`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newThemeSend)
          })
          .then(response => {
            if (response.status===200) {
              setinsertOk(true);
              setErrorText('');
              setNewThemeValue('');
              SetNewThemeTextValue('');
              navigate(`/reload/themes`);
            } else {
              setErrorText('An error occurred while pasting the theme!');
            }
          })
      } else {
        setErrorText('First text in the theme must be at least '+minChar+' characters long!');
      }
    } else {
      setErrorText('New theme must be at least '+minChar+' characters long!');
    }
  }

  return (
  <div className="newtheme-box">
    <strong>Add a new theme:</strong>
      <div className="buttonmargin">
        <Box sx={{ width: '100%' }} >
          <div className="buttonmargin">
            <TextField fullWidth
            onChange={(e)=>setNewThemeValue(e.target.value)}
            label="New theme name:"
            value={newThemeValue}/>
          </div>

          <div className="buttonmargin">
            <textarea className="themes-textarea"
            onChange={(e)=>SetNewThemeTextValue(e.target.value)}
            value={newThemeTextValue}
            placeholder="First text in:" />
          </div>
                
          <div className="buttonmargin">
            <Button 
              onClick={(e) => InsertThemeFunction(e)} 
              variant="contained"
              disableElevation>Insert
            </Button>
          </div>
        </Box>
        { errorText && <div className="error"><h4>{errorText}</h4></div> }
      </div>
    </div>  
  );
}

export default InsertTheme;