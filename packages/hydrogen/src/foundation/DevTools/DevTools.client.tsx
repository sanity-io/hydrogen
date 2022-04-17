import React, {useState, useCallback} from 'react';
import {
  // useNavigationListener,
  useLifecycleEventListener,
  // Navigation,
} from '@shopify/react-performance';
import {Interface, Panels} from './components';

// import type {DevServerMessage} from '../utilities/devtools';

// type Panel = 'warnings' | 'network';

export function DevTools({dataFromServer}: {dataFromServer: any}) {
  console.log(dataFromServer);
  // const [warnings] = useState<string[] | null>(null);
  const [open, setOpen] = useState(false);
  // const [activePanel, setActivePanel] = useState<Panel>('warnings');
  const toggleOpen = useCallback(() => {
    console.log('toggleOpen');
    setOpen((state) => !state);
  }, []);
  // const [hasMounted, setHasMounted] = React.useState(false);

  useLifecycleEventListener((event) => {
    console.log(event);
  });

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // const perfData = performance.getEntriesByType('navigation');
  // const entry = perfData[0];

  // let activePanelContent = null;

  // if (hasMounted) {
  return (
    <Interface open={open} onClose={toggleOpen} onOpen={toggleOpen}>
      <Panels />
    </Interface>
  );
  // }
}
