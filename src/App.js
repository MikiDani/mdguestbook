import React, { useState } from "react";
import { AppContext } from "./availableVariables";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Head from './Head';
import Themes from './pages/Themes';
import Theme from './pages/Theme';
import UsersList from './pages/UsersList';
import MyThemes from './pages/MyThemes';
import Login from './pages/Login';
import Modification from './pages/Modification';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import Reload from './pages/Reload';

const App = () => {

  const [userLogin, setUserLogin] = useState(false);
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(null);

  return(
    <div className='page'>
      <BrowserRouter>
        <AppContext.Provider value={{ userLogin, setUserLogin, user, setUser, userId, setUserId, }}>
          <Head user={user} />
          <div className="content">
            <Routes>
              <Route path='/' element={<Themes />} />
              <Route path='/theme/:id' element={<Theme/>} />
              <Route path='/usersList' element={<UsersList/>} />
              <Route path='/mythemes' element={<MyThemes/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/modification' element={<Modification />} />
              <Route path='/registration' element={<Registration/>} />
              <Route path='/reload/:id' element={<Reload link="themes"/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
    )
}

export default App;