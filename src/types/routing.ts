import {
  CommonStopInfo,
  HafasStation,
  ParsedProduct,
  ProdL,
  RemL,
} from './HAFAS';
import { Message } from './iris';
import { OutConL, SecL } from './HAFAS/TripSearch';
import { Station } from './station';

export interface Route$Stop {
  arrival?: CommonStopInfo;
  departure?: CommonStopInfo;
  station: Station;
  auslastung?: Route$Auslastung;
  messages?: RemL[];
  additional?: boolean;
  cancelled?: boolean;
  irisMessages?: Message[];
}
export type Route$JourneySegment =
  | Route$JourneySegmentTrain
  | Route$JourneySegmentWalk;
export enum AuslastungsValue {
  Gering = 1,
  Hoch,
  SehrHoch,
  Ausgebucht,
}
export interface Route$Auslastung {
  first?: AuslastungsValue;
  second?: AuslastungsValue;
}
export interface Route$Journey {
  cancelled?: boolean;
  changeDuration?: number;
  duration?: number;
  finalDestination: string;
  jid: string;
  product?: ProdL;
  raw?: SecL;
  segmentDestination: Station;
  segmentStart: Station;
  stops: Route$Stop[];
  train: ParsedProduct;
  auslastung?: Route$Auslastung;
  messages?: RemL[];
}
export interface Route$JourneySegmentTrain extends Route$Journey {
  type: 'JNY';
  arrival: CommonStopInfo;
  departure: CommonStopInfo;
  wings?: Route$Journey[];
}

export type WalkStopInfo = Pick<CommonStopInfo, 'time' | 'delay'>;

export interface Route$JourneySegmentWalk {
  type: 'WALK';
  train: ParsedProduct;
  arrival: WalkStopInfo;
  departure: WalkStopInfo;
  duration: number;
  segmentStart: HafasStation;
  segmentDestination: HafasStation;
}

export interface SingleRoute {
  arrival: CommonStopInfo;
  departure: CommonStopInfo;
  isRideable: boolean;
  checksum: string;
  cid: string;
  date: number;
  duration: number;
  changes: number;
  segments: Route$JourneySegment[];
  segmentTypes: string[];
  raw?: OutConL;
}

export interface RoutingResult {
  routes: SingleRoute[];
  context: {
    earlier: string;
    later: string;
  };
}
