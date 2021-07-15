import { useState, useCallback } from 'react';

type ReturnType<T> = [
  T,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
];
function useInput<T>(initialValue: T): ReturnType<T> {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value as unknown as T);
    },
    [setValue],
  );

  const onClear = useCallback(() => {
    setValue('' as unknown as T);
  }, [setValue]);

  return [value, onChange, onClear];
}

export default useInput;
