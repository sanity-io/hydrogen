import React, {useState} from 'react';
import {Navigation, NavigationListener} from '@shopify/react-performance';

interface Props {
  navigations?: Navigation[];
}

export function Performance({navigations: navsFromProps}: Props) {
  const [stateNavs, setStateNavs] = useState<Navigation[]>([]);

  const navigations = navsFromProps ? navsFromProps : stateNavs;

  const lastNavigation = navigations[navigations.length - 1];
  const previousNavigations = navigations.slice(0, -1);
  const navigationItems = previousNavigations.map(
    ({start, target, duration}) => (
      <li key={`${start}${target}`}>
        <div>
          <p>{target}</p>
          <p>
            <span>{start}</span> in <span>{duration}</span>
          </p>
        </div>
      </li>
    )
  );

  const previousNavigationsMarkup =
    previousNavigations.length > 0 ? <ol>{navigationItems}</ol> : null;

  const lastNavigationMarkup =
    lastNavigation == null ? null : (
      <NavigationDetails navigation={lastNavigation} />
    );

  return (
    <>
      {previousNavigationsMarkup}
      {lastNavigationMarkup}
      <NavigationListener
        onNavigation={(navigation: Navigation) => {
          setStateNavs([...stateNavs.slice(-9), navigation]);
        }}
      />
    </>
  );
}

interface NavigationDetailsProps {
  navigation: Navigation;
}

export function NavigationDetails({navigation}: NavigationDetailsProps) {
  const {start, duration, target} = navigation;

  return (
    <>
      <p>{target}</p>
      <p>{duration}</p>
      <p>{start}</p>
    </>
  );
}
