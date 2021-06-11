import { useState, useCallback } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return [value, onChange] as [string, typeof onChange];
}

export default useInput;
