import React from 'react';
import {Heading} from './Heading';
import {Table} from './Table';

interface Props {
  locale: string;
}

const KEY_MAP = {
  locale: 'Locale',
  languageCode: 'Language',
  storeDomain: 'Domain',
  storefrontToken: 'Token',
  storefrontApiVersion: 'API Version',
};

export function Settings(props: Props) {
  const items = Object.entries(props).map(([key, value]) => ({
    key: KEY_MAP[key as 'locale'] ?? key,
    value,
  }));
  return (
    <>
      <Heading url={`vscode://~/hydrogen.config.js`} linkText="edit">
        Config
      </Heading>
      <Table items={items} />
    </>
  );
}
