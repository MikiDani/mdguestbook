import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from '../availableVariables';
import { useNavigate } from 'react-router-dom';
import epochDate from '../epochdate';
import loadDatabase from "../loadDatabase";
import loading from './loading.gif';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Theme = () => {

  const navigate = useNavigate();
  const { user, userId } = useAppContext();
  const { id } = useParams();
  const [sortingValue, setSortingValue] = useState('date');
  const { data, waiting, loadError } = loadDatabase(`http://localhost:8080/api/theme/${id}?search=${sortingValue}`);

  const [newMessageTextValue, SetnewMessageTextValue] = useState('');
  const [errorText, setErrorText] = useState(false);
  const [nameLoad, setNameLoad] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/userslist`)
    .then(response => {
      if (!response.ok) {
      throw Error('Response not ok!');
      }
      return response.json();
    })
    .then(dataUsers => {
      setNameLoad(dataUsers);
    })
  },[sortingValue]);

  const userNameLoad = (userId) => {
    let found;
    if (nameLoad) {
      found = nameLoad.find(user => user.id === userId);
    }
    return found.userName;
  }

  const change = (Value) => {
    setSortingValue(Value);
  }

  const SortingBar = () => {
    return(
      <div className="sorting-bar">
        <button 
        className={sortingValue==='date' ? "sorting-bar-on" : "sorting-bar-off"}
        value="date" 
        onClick={(e) => change('date')}>Date
        </button>
        <button 
        className={sortingValue==='dateinversely' ? "sorting-bar-on" : "sorting-bar-off"}
        value="dateinversely" 
        onClick={(e) => change('dateinversely')}>Date invert
        </button>
        <button 
        className={sortingValue==='asc' ? "sorting-bar-on" : "sorting-bar-off"}
        value="asc" 
        onClick={(e) => change('asc')}>ASC
        </button>
        <button 
        className={sortingValue==='desc' ? "sorting-bar-on" : "sorting-bar-off"}
        value="desc" 
        onClick={(e) => change('desc')}>DESC
        </button>
      </div>
    );
  }

  const  InsertMessageFunction= ({data}) => {
    // insert Message
    let minChar = 5;
    if (newMessageTextValue.length>minChar) {
      
      const newMessageSend =
        {
          "themeId": data.id,
          "messageText": newMessageTextValue,
          "messageUserId": userId
        }

        const response = fetch(`http://localhost:8080/api/bookslist/addmessage`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newMessageSend})
        })
        .then(response => {
          if (response.status===200) {
          navigate(`/reload/${data.id}`);
        } else {
          console.log('An error occurred while pasting the message!');
        }
        })
    } else { 
      setErrorText('The message must be at least '+minChar+' characters long! '); 
    }
  }

  const deleteMessage = (messageId) => {
    //Delete message
    const response = fetch(`http://localhost:8080/api/bookslist/deletemessage`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({messageId: messageId, themeId: data.id})
      })
      .then(response => {
        if (response.status===200) {
        navigate(`/reload/${data.id}`);
      } else {
        console.log('An error occurred while pasting the theme!');
      }
    })
  }
  
  const SelectTheme = ({data}) => {
    return (
    <div key={data.id} className="theme">
      <div className="theme-head">
        <div className="theme-head-datetime">{epochDate(data.bookDate)} {data.bookTime}</div>
        <div className="theme-head-username">Created: {userNameLoad(data.bookUserId)}</div>
        <div className="theme-head-name"><strong>{data.bookName}</strong></div>
      </div>
      {data.messageDatabase.map((messageList) => (
      <div key={messageList.id} className="messageList">
        <div className="messageList-head">
          <div className="messageList-username">{userNameLoad(messageList.messageUserId)}</div>
          <div className="messageList-datatime">{messageList.messageTime}</div>
          <div className="messageList-datatime">{epochDate(messageList.messageDate)}</div>
        </div>
        <div className="messageList-message">{messageList.messageText}</div>
        <div className="messageList-deletebutton">
          {  (messageList.messageUserId === userId) &&
          <Button 
            onClick={() => deleteMessage(messageList.id)}
            key={data.bookUserId}
            variant="contained"
            disableElevation>Delete message
          </Button>
          }
        </div>
      </div>
      ))}    
    </div>
    );
  }

  return (
    <div className="theme">
      <div className="theme-headtext"><h2>Theme</h2></div>
      <SortingBar />
      { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
      { loadError && <div className="theme-headtext"><h4 className="error">{ loadError }</h4></div> }
      { data && <SelectTheme data={data} key={data.id} /> }
      { user && 
      <div className="newMessage-box" key={userId} >
      <div className="buttonmargin">
        <strong>Add a new message:</strong>
        <Box sx={{ width: '100%' }} >
          <div className="buttonmargin">
            <textarea className="themes-textarea"
            onChange={(e)=>SetnewMessageTextValue(e.target.value)}
            value={newMessageTextValue}
            placeholder="New message:" />
          </div>  
          <div className="buttonmargin">
            <Button 
              onClick={(e) => InsertMessageFunction({data})}
              variant="contained"
              disableElevation>Insert
            </Button>
          </div>
        </Box>
        { errorText && <div className="error"><h4>{errorText}</h4></div> }
      </div>
    </div>
      }
    </div>
  );
}

export default Theme;