import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../availableVariables';
import epochDate from '../epochdate';
import Button from '@mui/material/Button';

const MyWritings = () => {

  const {user, userId } = useAppContext();
  const navigate = useNavigate();

  const [userThemeNotFind, setUserThemeNotFind] = useState(null);
  const [userThemes, setUserThemes] = useState(null);
  const [deleted, setDeleted] = useState(null);
  
  useEffect(() => {
    if (user) {
    setTimeout(() => {
        fetch(`http://localhost:8080/api/user/booklist/${userId}`)
        .then(response => {
          if (response.status===200) { return response.json(); }
        })
        .then(themesData => {
          if (themesData.length===0) { 
            setUserThemeNotFind('You have no theme.');
            setUserThemes('');
          } else {
            setUserThemes(themesData);
          }
        })
      }, 50);
    } else { navigate('/'); }
  },[deleted, userThemeNotFind]);

  const deleteTheme = (themeId) => {
    const response = fetch(`http://localhost:8080/api/bookslist/delete`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({themeId})
      })
      .then(response => {
        if (response.status===200) {
        setDeleted(themeId);
      } else {
        console.log('An error occurred while pasting the theme!');
      }
    })
  }
  
  return ( 
  <div className="mywritings">
    <h2>My Themes</h2>
    { userThemeNotFind && <div className='notheme'><h4>{userThemeNotFind}</h4></div> }
    { userThemes && (
      <>
      <h4>The themes you opened:</h4>
      { userThemes.map((userTheme) => (
      <div className="mytheme-list" key={userTheme.id}>
        <Link to ={`/theme/${userTheme.id}`} key={userTheme.id} >
          <div className="mytheme" key={userTheme.bookTime} >
            <div className="mytheme-datetime" key={userTheme.bookDate}><div className='ready'>{epochDate(userTheme.bookDate)} {userTheme.bookTime}</div></div>
            <div className="mytheme-themename" key={userTheme.bookName}><strong>{userTheme.bookName}</strong></div>
          </div>
        </Link>
        <Button 
          onClick={(e) => deleteTheme(userTheme.id)}
          key={userTheme.bookDate}
          variant="contained"
          disableElevation>Delete Theme
        </Button>
      </div>
      )) }
      </>
    ) }
  </div>
  );
}

export default MyWritings;