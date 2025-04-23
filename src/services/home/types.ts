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
