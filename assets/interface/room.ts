export interface Room {
  holidayPrice: number;
  id: string;
  imageUrl: string;
  name: string;
  normalPrice: number;
}

export interface F2EApiResponse {
  items: Room[];
  success: boolean;
}
