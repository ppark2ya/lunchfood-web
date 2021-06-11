import { useRef } from 'react';

function useComponentWillMount(callback: () => void) {
  const willMount = useRef(true);

  if (willMount.current) callback();

  willMount.current = false;
}

export default useComponentWillMount;
