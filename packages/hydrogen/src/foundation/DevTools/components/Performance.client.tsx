import React, {useState} from 'react';
import {Navigation, NavigationListener} from '@shopify/react-performance';
import {Table} from './Table';
import {Heading} from './Heading';

export function Performance() {
  const [navigations, setStateNavs] = useState<Navigation[]>([]);

  const lastNavigation = navigations[navigations.length - 1];
  const previousNavigations = navigations.slice(0, -1);
  const navigationItems = previousNavigations.map(
    ({start, target, duration}, index) => (
      <li key={`${start}${target}--${index}`}>
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
      <>
        <Heading>Page request</Heading>
        <NavigationDetails navigation={lastNavigation} />
      </>
    );

  return (
    <>
      {previousNavigationsMarkup}
      {lastNavigationMarkup}
      <NavigationListener
        onNavigation={(navigation: Navigation) => {
          setStateNavs((navs) => [...navigations, navigation]);
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
    <Table
      items={[
        {key: 'path', value: target},
        {key: 'start', value: start.toString()},
        {key: 'duration', value: duration.toString()},
      ]}
    />
  );
}
