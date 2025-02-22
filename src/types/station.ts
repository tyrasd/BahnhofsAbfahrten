// eslint-disable-next-line import/prefer-default-export

export enum StationSearchType {
  default = 'default',
  favendo = 'favendo',
  hafas = 'hafas',
  openData = 'openData',
  openDataOffline = 'openDataOffline',
  stationsData = 'stationsData',
  favendoStationsData = 'favendoStationsData',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CommonStation {
  title: string;
  id: string;
}

export interface Station extends CommonStation {
  favendoId?: number;
  DS100?: string;
}

export interface IrisStationWithRelated {
  station: IrisStation;
  relatedStations: IrisStation[];
}

export interface IrisStation {
  name: string;
  meta: string[];
  eva: string;
  ds100: string;
  db: string;
  creationts: string;
  p: string;
}

export interface OpenDBStation {
  name: string;
  lon: string;
  lat: string;
  id: string;
}

export interface FavendoStation {
  type: 'station_search';
  id: number;
  title: string;
  eva_ids: string[];
  distanceInKm: number;
  location: [number, number];
}

export interface OpenDataStation {
  number: number;
  name: string;
  mailingAddress: {
    city: string;
    zipcode: string;
    street: string;
  };
  category: number;
  priceCategory: number;
  hasParking: boolean;
  hasBicycleParking: boolean;
  hasLocalPublicTransport: boolean;
  hasPublicFacilities: boolean;
  hasLockerSystem: boolean;
  hasTaxiRank: boolean;
  hasTravelNecessities: boolean;
  hasSteplessAccess: 'yes' | 'no';
  hasMobilityService: string;
  hasWiFi: boolean;
  hasTravelCenter: boolean;
  hasRailwayMission: boolean;
  hasDBLounge: boolean;
  hasLostAndFound: boolean;
  hasCarRental: boolean;
  federalState: string;
  regionalbereich: {
    number: number;
    name: string;
    shortName: string;
  };
  aufgabentraeger: {
    shortName: string;
    name: string;
  };
  DBinformation: {
    availability: {
      monday: {
        fromTime: string;
        toTime: string;
      };
      tuesday: {
        fromTime: string;
        toTime: string;
      };
      wednesday: {
        fromTime: string;
        toTime: string;
      };
      thursday: {
        fromTime: string;
        toTime: string;
      };
      friday: {
        fromTime: string;
        toTime: string;
      };
      saturday: {
        fromTime: string;
        toTime: string;
      };
      sunday: {
        fromTime: string;
        toTime: string;
      };
      holiday: {
        fromTime: string;
        toTime: string;
      };
    };
  };
  localServiceStaff: {
    availability: {
      monday: {
        fromTime: string;
        toTime: string;
      };
      tuesday: {
        fromTime: string;
        toTime: string;
      };
      wednesday: {
        fromTime: string;
        toTime: string;
      };
      thursday: {
        fromTime: string;
        toTime: string;
      };
      friday: {
        fromTime: string;
        toTime: string;
      };
      saturday: {
        fromTime: string;
        toTime: string;
      };
      sunday: {
        fromTime: string;
        toTime: string;
      };
      holiday: {
        fromTime: string;
        toTime: string;
      };
    };
  };
  timeTableOffice: {
    email: string;
    name: string;
  };
  szentrale: {
    number: number;
    publicPhoneNumber: string;
    name: string;
  };
  stationManagement: {
    number: number;
    name: string;
  };
  evaNumbers: [
    {
      number: number;
      geographicCoordinates: {
        type: string;
        coordinates: [number, number];
      };
      isMain: boolean;
    }
  ];
  ril100Identifiers: [
    {
      rilIdentifier: string;
      isMain: boolean;
      hasSteamPermission: boolean;
      geographicCoordinates: {
        type: string;
        coordinates: [number, number];
      };
    }
  ];
}
