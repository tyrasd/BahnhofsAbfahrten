import { Abfahrt } from 'types/abfahrten';
import { isBefore } from 'date-fns';
import React, { SyntheticEvent } from 'react';

type Props = {
  abfahrt: Abfahrt;
  className?: string;
};

// 30 Minutes in ms
const timeConstraint = 30 * 60 * 1000;

const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
const TravelynxLink = ({ abfahrt, className }: Props) =>
  abfahrt.departure &&
  !abfahrt.departure.isCancelled &&
  isBefore(
    abfahrt.arrival
      ? abfahrt.arrival.scheduledTime
      : abfahrt.departure.scheduledTime,
    Date.now() + timeConstraint
  ) ? (
    <a
      className={className}
      onClick={stopPropagation}
      rel="noopener noreferrer"
      target="_blank"
      href={`https://travelynx.de/s/${abfahrt.currentStation.id}?train=${abfahrt
        .train.thirdParty || abfahrt.train.type} ${abfahrt.train.number}`}
    >
      travelynx
    </a>
  ) : null;

export default TravelynxLink;
