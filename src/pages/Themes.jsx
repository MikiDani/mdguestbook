import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import loadDatabase from '../loadDatabase';
import InsertTheme from './InsertTheme';
import { useAppContext } from '../availableVariables';
import { useNavigate } from 'react-router-dom';
import epochDate from '../epochdate'
import loading from './loading.gif';

import Button from '@mui/material/Button';

const Themes = () => {

  const {user, userId } = useAppContext();

  const navigate = useNavigate();

  const [sortingValue, setSortingValue] = useState('date');
  const [usersListError, setUsersListError] = useState(false);
  const [nameLoad, setNameLoad] = useState(null);

  const {data, waiting, loadError} = loadDatabase(`http://localhost:8080/api/bookslist?search=${sortingValue}`);

  useEffect(() => {
    setUsersListError(false);
    if (data) {
      if (data.length<1) {
        setUsersListError('Now no theme in the database.');
      }
    }

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
  },[data]);
  
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

  const deleteTheme = (themeId) => {
    const response = fetch(`http://localhost:8080/api/bookslist/delete`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({themeId})
      })
      .then(response => {
        if (response.status===200) {  
        navigate(`/reload/themes`);
      } else {
        console.log('An error occurred while pasting the theme!');
      }
    })
  }

  const ThemeList = ({data}) => {
    return (
      data.map((theme) => (
      <div className="theme-list-all" key={theme.id} >
        <Link to ={`/theme/${theme.id}`} key={theme.bookName} >
          <div className='theme-list'>
            <div className="themes-title">{theme.bookName}</div>
            <div className="datatime-username-box">
              <div className="themes-userName">created: <strong>{ nameLoad && userNameLoad(theme.bookUserId) }</strong></div>
              <div className="themes-datetime"><strong>{epochDate(theme.bookDate)} {theme.bookTime}</strong></div>
            </div>
          </div>
        </Link>
        { (theme.bookUserId === userId) &&
        <Button 
          onClick={(e) => deleteTheme(theme.id)}
          key={theme.bookDate}
          variant="contained"
          disableElevation>Delete Theme
        </Button>
        }
      </div>
      ))
    );
  }

  return (
    <div className="themes">
      <h2>All Themes</h2>
      <SortingBar />
      { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
      { usersListError && <div className='notheme'><h4 className="ready">{usersListError}</h4></div> }
      { loadError && <h4>{ loadError }</h4> }
      { data && <ThemeList data={data} key={data.id} /> }
      { user && <InsertTheme key={userId} /> }
    </div>
  );
}

export default Themes;