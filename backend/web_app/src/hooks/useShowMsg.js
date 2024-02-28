import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetMsg } from 'Redux/actions/login';

const useShowMsg = auth => {
  const [showMsg, setShowMsg] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth?.success || auth.error !== null) {
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        dispatch(resetMsg());
      }, 5000);
    }
  }, [auth.success, auth.error]);

  return { showMsg };
};

export default useShowMsg;
