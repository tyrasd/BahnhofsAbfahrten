import * as React from 'react';
import { Route$Auslastung } from 'types/routing';
import SingleAuslastungsDisplay from 'Common/Components/SingleAuslastungsDisplay';
import useStyles from './AuslastungsDisplay.style';

interface OwnProps {
  auslastung: Route$Auslastung;
}

export type Props = OwnProps;

const AuslastungsDisplay = (props: Props) => {
  const classes = useStyles(props);
  const { auslastung } = props;

  return (
    <div data-testid="auslastungDisplay" className={classes.main}>
      <div data-testid="first" className={classes.entry}>
        <span>1</span>
        <SingleAuslastungsDisplay auslastung={auslastung.first} />
      </div>
      <div data-testid="second" className={classes.entry}>
        <span>2</span>
        <SingleAuslastungsDisplay auslastung={auslastung.second} />
      </div>
    </div>
  );
};

export default AuslastungsDisplay;
