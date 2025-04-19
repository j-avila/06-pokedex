import React, {useEffect, useState} from 'react';

const useDebouncerValue = (input: string = '', timer: number = 500) => {
  const [deboundcedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, timer);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  return deboundcedValue;
};

export default useDebouncerValue;
