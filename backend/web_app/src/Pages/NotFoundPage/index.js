import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
      <h3>Page not found or you are not authorized to view it.</h3>
      <Button onClick={() => history.push('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;
