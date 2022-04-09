import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Reload = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => { 
    if (id==='modification') { navigate('/modification'); }
    id ==='themes' ? navigate('/') : navigate('/theme/'+id);
  }, []);

  return ( 
    <div className="reload">
      <h2>Reload!id: {id}</h2>
    </div>
  );
}

export default Reload;