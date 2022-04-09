import { Link } from 'react-router-dom';
import { useAppContext } from "./availableVariables";
import { useNavigate } from 'react-router-dom';

const Head = () => {

  const { userLogin, setUserLogin, user, setUser, setUserId } = useAppContext();

  const navigate = useNavigate();

  const loginOut = () => {
    setUserLogin(false);
    setUser(false);
    setUserId(null);
    navigate(`/`);
  }

  return (
    <nav className="head">
      <div className="head-left">
        <h1>DM GUESTBOOK</h1>
        <Link to="/"><button>All themes</button></Link>
        <Link to="/UsersList"><button>Users</button></Link>
        { userLogin && <Link to="/Mythemes"><button>My themes</button></Link> }
      </div>
      <div className="head-right">
        {userLogin ? (
          <>
          <Link to="/modification" >
          <div className='head-username'><strong>user:<br/>{user}</strong></div>
          </Link>
          <button onClick={loginOut}>Login Out</button>
          </>
        ) : (
          <>
          <Link to="/Login" ><button>Login</button></Link><br/>
          <Link to="/registration"><button>Registration</button></Link>
          </>
        ) }
      </div>
    </nav>
  );
}

export default Head;