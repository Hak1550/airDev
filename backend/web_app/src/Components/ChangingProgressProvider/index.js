import { useEffect } from 'react';
import { useState } from 'react';

const ChangingProgressProvider = props => {
  const interval = 1000;
  const [valuesIndex, setValueIndex] = useState(0);
  const [running, setRunning] = useState(true);
  let id = undefined;

  useEffect(() => {
    if (running) {
      id = setInterval(() => {
        setValueIndex(prev => prev + 1);
      }, interval);
    } else clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (props.values[valuesIndex] === 100 || valuesIndex >= 5) {
      setRunning(false);
      clearInterval(id);
    }
  }, [valuesIndex]);

  return props.children(props.values[valuesIndex]);
};

export default ChangingProgressProvider;
