export interface RoomBillType {
  usage: number;
  bill: number;
  users: RoomUserType[];
}

export interface RoomUserType {
  roomNumber: string;
  previousUsage: number;
  currentUsage: number;
  people: number;
}

export interface UserRoomBill {
  roomID: string;
  roomBill: number;
  usage: number;
  people: number;
}

export interface Bill {
  totalUsage: number;
  totalBill: number;
  rate: number;
  commonAreaBill: number;
  commonAreaUsage: number;
  rooms: UserRoomBill[];
}
