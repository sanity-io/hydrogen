import React, {useState} from 'react';
import {Navigation, useNavigationListener} from '@shopify/react-performance';

import {Performance} from './Performance';

export interface Props {
  navigations?: Navigation[];
}

interface Panel {
  content: string;
  panel: React.ReactNode;
  icon: React.ReactNode;
}

interface Panels {
  performance: Panel;
  settings: Panel;
}

export function Panels({navigations}: Props) {
  // TODO: Persist/store the active panel
  const [selectedPanel, setSelectedPanel] = useState<number>(0);
  const panels = getPanels();
  const panelComponents = panels.map(({panel}) => panel);

  return (
    <div style={{display: 'flex'}}>
      <div style={{borderRight: '1px solid', padding: '1em 0em'}}>
        {panels.map(({content, icon, id}, index) => {
          const active = selectedPanel === index;
          return (
            <button
              key={id}
              type="button"
              style={{
                padding: '0em 1.25em',
                fontWeight: active ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => setSelectedPanel(index)}
            >
              <span style={{paddingRight: '0.25em'}}>{icon}</span>
              <span style={{fontFamily: 'monospace'}}>{content}</span>
            </button>
          );
        })}
      </div>
      <div style={{padding: '1.25em'}}>
        {panelComponents[selectedPanel ? selectedPanel : 0]}
      </div>
    </div>
  );
}

function SettingsPanel() {
  return <Panel>Settings component</Panel>;
}

// function PerformancePanel() {
//   const [lastNavigation, setLastNavigation] = useState<Navigation | null>(null);

//   // listen for subsequent client-side navigations and update our state
//   useNavigationListener((navigation) => {
//     setLastNavigation(navigation);
//   });

//   if (lastNavigation == null) {
//     return <p>no data</p>;
//   }

//   const {duration, isFullPageNavigation, target} = lastNavigation;

//   // output some information about the last navigation
//   const navigationType = isFullPageNavigation
//     ? 'full page navigation'
//     : 'single-page-app style navigation';

//   return (
//     <Panel>
//       <p>
//         The last navigation was to {target}. It was a {navigationType}{' '}
//         navigation which took {duration / 1000} seconds to complete.
//       </p>
//     </Panel>
//   );
// }

function Panel({children}: {children: React.ReactNode}) {
  return <div>{children}</div>;
}

function getPanels() {
  const panels: Panels = {
    settings: {
      content: 'Settings',
      panel: <SettingsPanel />,
      icon: '🎛',
    },
    performance: {
      content: 'Performance',
      panel: <Performance />,
      icon: '⏱',
    },
  };

  return Object.keys(panels).map((key) => {
    return {...panels[key as keyof Panels], id: key};
  });
}
