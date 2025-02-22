import { Link } from 'react-router-dom';
import { Redirect, StaticRouterContext } from 'react-router';
import AbfahrtenContainer, {
  AbfahrtenError,
} from 'Abfahrten/container/AbfahrtenContainer';
import favContainer from 'Abfahrten/container/FavContainer';
import FavEntry, { FavEntryDisplay } from './FavEntry';
import MostUsed from './MostUsed';
import React, { useEffect, useMemo, useState } from 'react';
import useStyles from './FavList.style';

function getErrorText(
  error: AbfahrtenError,
  staticContext?: StaticRouterContext
): React.ReactNode {
  switch (error.type) {
    case 'redirect':
      return <Redirect to={error.redirect} />;
    case '404':
      if (staticContext) {
        staticContext.status = 404;
      }

      return 'Die Abfahrt existiert nicht';
    default:
      if (error.code === 'ECONNABORTED') {
        return 'Timeout - bitte erneut versuchen';
      }
      if (error && error.response && error.response.data.error) {
        return getErrorText(error.response.data.error, staticContext);
      }

      return 'Unbekannter Fehler';
  }
}

type Props = {
  staticContext?: StaticRouterContext;
};

const FavList = ({ staticContext }: Props) => {
  const { favs } = favContainer.useContainer();
  const sortedFavs = useMemo(() => {
    const values = Object.values(favs);

    return values
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
      .map(fav => fav && <FavEntry key={fav.id} fav={fav} />);
  }, [favs]);
  const {
    error,
    setCurrentStation,
    setError,
  } = AbfahrtenContainer.useContainer();
  const [savedError] = useState(error);
  const classes = useStyles();

  useEffect(() => {
    setCurrentStation(undefined);
    setError(undefined);
  }, [setCurrentStation, setError]);

  return (
    <main className={classes.main}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {savedError ? (
        <>
          <FavEntryDisplay text={getErrorText(savedError, staticContext)} />
          {savedError.station && (
            <Link to={encodeURIComponent(savedError.station)}>
              <FavEntryDisplay text={savedError.station} />
            </Link>
          )}
          <FavEntryDisplay text="Versuch einen der folgenden" />
          <MostUsed />
        </>
      ) : sortedFavs.length ? (
        sortedFavs
      ) : (
        <>
          <FavEntryDisplay data-testid="noFav" text="Keine Favoriten" />
          <FavEntryDisplay text="Oft gesucht:" />
          <MostUsed />
        </>
      )}
    </main>
  );
};

export default FavList;
