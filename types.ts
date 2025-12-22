export type TabType = 'schedule' | 'bookings';

export type CategoryType = string; 

export type HighlightColor = 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'gray';

export interface HighlightTag {
  id: string;
  text: string;
  color: HighlightColor;
}

export interface Member {
  id: string;
  name: string;
  avatar: string; // URL
}

export interface WeatherInfo {
  condition: 'sunny' | 'cloudy' | 'rain' | 'snow';
  temp: number;
  locationName: string;
}

export interface GuideInfo {
  story: string;
  highlights: HighlightTag[];
  tip: string;
}

export interface CheckListItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ScheduleItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  displayTime?: string;
  title: string;
  location: string;
  mapQuery?: string;
  mapUrl?: string;
  businessHours?: string;
  category: CategoryType;
  categoryColor?: HighlightColor;
  description?: string;
  coordinates?: { lat: number; lng: number };
  guideInfo?: GuideInfo;
  photos?: string[];
  isCompleted?: boolean;
  isKlook?: boolean;
  isTabelog?: boolean;
  isGoogle?: boolean;
  isTablecheck?: boolean;
  checkList?: CheckListItem[];
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'train' | 'activity' | 'transfer';
  title: string;
  subTitle?: string;
  referenceNo: string;
  date: string; // YYYY-MM-DD
  time?: string;
  details: Record<string, string>;
  fileUrl?: string;
  status: 'confirmed' | 'pending';
}

export interface ZenTripData {
  tripName: string;
  schedule: ScheduleItem[];
  bookings: Booking[];
  lastUpdated: number;
}
