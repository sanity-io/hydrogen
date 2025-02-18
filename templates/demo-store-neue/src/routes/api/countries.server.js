export async function api(request, {queryShop, session}) {
  if (request.method === 'POST') {
    const {isoCode, name} = await request.json();

    await session.set('countryCode', isoCode);
    await session.set('countryName', name);

    return 'success';
  }

  const {
    data: {
      localization: {availableCountries},
    },
  } = await queryShop({
    query: COUNTRIES_QUERY,
  });

  return availableCountries.sort((a, b) => a.name.localeCompare(b.name));
}

const COUNTRIES_QUERY = `
  query Localization {
    localization {
      availableCountries {
        isoCode
        name
        currency {
          isoCode
        }
      }
    }
  }
`;
