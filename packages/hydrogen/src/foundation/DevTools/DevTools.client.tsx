import React, {useState, useEffect, useCallback} from 'react';
import {useLifecycleEventListener} from '@shopify/react-performance';
import {Interface, Panels} from './components';

export function DevTools({dataFromServer}: {dataFromServer: any}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    console.log('toggleOpen');
    setOpen((state) => !state);
  }, []);
  const [hasMounted, setHasMounted] = React.useState(false);

  useLifecycleEventListener((event) => {
    console.log(event);
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return (
      <Interface open={open} onClose={toggleOpen} onOpen={toggleOpen}>
        <Panels />
      </Interface>
    );
  }

  return null;
}
