import loadDatabase from '../loadDatabase';
import loading from './loading.gif';
import epochDate from '../epochdate';

const UsersList = () => {
  const { data, waiting, loadError } = loadDatabase(`http://localhost:8080/api/activeuserslist`);

  const List = ({data}) => {
    return (
      data.length>1 ? (
        data.map((user) => (
        <div key={user.id} className="userlist">
          <div className="userlist-name">{user.userName}</div>
          <div className="userlist-email"><a href={`mailto:${user.userEmail}`}>{user.userEmail}</a></div>
          <div className="userlist-date">{epochDate(user.userDate)} {user.userTime}</div>
        </div>
        ))
      ) : (
        <div className='notheme'><h4>No user registered.</h4></div>
      )
    );
  }

  return (
    <div className="userlistall">
      <h2>UsersList</h2>
        { waiting && <div className="loading"><img src={loading} alt="loading" /></div> }
        { loadError && <h4>{ loadError }</h4> }
        { data && <List data={data} key={data.id} /> }
    </div>
  );
}

export default UsersList;