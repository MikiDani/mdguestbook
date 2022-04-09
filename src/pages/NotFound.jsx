import { Link } from 'react-router-dom';

const NotFound = () => {  
  return (  
    <div className="notfound">
        <h2>Page Not Found!</h2>
        <h5><Link to="/">Back to themes.</Link></h5>
    </div>
  );
}

export default NotFound;