import React, {useState} from 'react';
import {Navigation, useNavigationListener} from '@shopify/react-performance';

export interface Props {
  navigations?: Navigation[];
}

interface Panel {
  content: string;
  panel: React.ReactNode;
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
    <>
      <div style={{}}>
        {panels.map(({content, id}, index) => {
          const active = selectedPanel === index;
          return (
            <div key={id}>
              <button
                type="button"
                style={{color: active ? 'red' : 'black'}}
                onClick={() => setSelectedPanel(index)}
              >
                {content}
              </button>
            </div>
          );
        })}
      </div>
      <div>{panelComponents[selectedPanel ? selectedPanel : 0]}</div>
    </>
  );
}

function SettingsPanel() {
  return <Panel title="Settings">Settings component</Panel>;
}

function PerformancePanel() {
  const [lastNavigation, setLastNavigation] = useState<Navigation | null>(null);

  // listen for subsequent client-side navigations and update our state
  useNavigationListener((navigation) => {
    setLastNavigation(navigation);
  });

  if (lastNavigation == null) {
    return <p>no data</p>;
  }

  const {duration, isFullPageNavigation, target} = lastNavigation;

  // output some information about the last navigation
  const navigationType = isFullPageNavigation
    ? 'full page navigation'
    : 'single-page-app style navigation';

  return (
    <Panel title="Performance">
      <p>
        The last navigation was to {target}. It was a {navigationType}{' '}
        navigation which took {duration / 1000} seconds to complete.
      </p>
    </Panel>
  );
}

function Panel({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function getPanels() {
  const panels: Panels = {
    settings: {
      content: 'Settings',
      panel: <SettingsPanel />,
    },
    performance: {
      content: 'Performance',
      panel: <PerformancePanel />,
    },
  };

  return Object.keys(panels).map((key) => {
    return {...panels[key as keyof Panels], id: key};
  });
}
