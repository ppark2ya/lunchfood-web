import { useState, useCallback } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  const onClear = useCallback(() => {
    setValue('');
  }, [setValue]);

  return [value, onChange, onClear] as [
    string,
    typeof onChange,
    typeof onClear,
  ];
}

export default useInput;
