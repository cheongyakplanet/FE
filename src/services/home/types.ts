/** Home Popular Locations DTO */
export interface HomePopularLocationsDto {}

export interface PopularPostDto {
  id: string;
  title: string;
}

export interface FacilitiesDto {
  dgmNm: string;
  longitude: number;
  latitude: number;
}

export interface SubscriptionByMyRegionDto {
  id: string;
  region: string;
  city: string;
  district: string;
  houseManageNo: string;
  houseNm: string;
  bsnsMbyNm: string;
  houseSecNm: string | null;
  rceptBgnde: string;
  rceptEndde: string;
  totSuplyHshldco: string | null;
}

export interface InfraDto {
  stations: Station[];
  schools: School[];
}

export interface Station {
  number: string;
  name: string;
  line: string;
  operator: string;
  latitude: number;
  longitude: number;
  distance: number;
  transger: boolean;
}

export interface School {
  schoolId: string;
  schoolName: string;
  category: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface SubscriptionDetailDto {
  id: number;
  bsnsMbyNm: string;
  cnstrctEntrpsNm: string;
  cntrctCnclsBgnde: string;
  cntrctCnclsEndde: string;
  hssplyAdres: string;
  hssplyZip: string;
  houseManageNo: string;
  houseNm: string;
  region: string;
  city: string;
  district: string;
  detail: string;
  latitude: string;
  longitude: string;
}
