export interface Expense {
  amountLocal: number;
  amountKRW: number;
  currency: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'FOOD' | 'CAFE' | 'SIGHT' | 'HOME' | string;
  address?: string;
  latitude: number;
  longitude: number;
  visitTime?: string;
  isAccommodation: boolean;
  expense?: Expense; // 지출이 있을 수도 없을 수도 있음
}

export interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  places: Place[];
}