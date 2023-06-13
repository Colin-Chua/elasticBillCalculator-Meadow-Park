import { Bill, RoomBillType, UserRoomBill } from "@/components/utils/types";

export const CalculateBill = (data: RoomBillType) => {
  console.log(data);
  const rate = Number(data.bill / data.usage);

  const usersRoom: UserRoomBill[] = [];
  let roomTotalUsage: number = 0;
  const result: Bill = {
    totalUsage: 0,
    totalBill: 0,
    rate: 0,
    commonAreaBill: 0,
    commonAreaUsage: 0,
    rooms: [],
  };

  data.users.map((user, index) => {
    const newUserRoom: UserRoomBill = {
      roomID: "",
      usage: 0,
      roomBill: 0,
      people: 0,
    };

    newUserRoom.roomID = `B${index+1}`;
    newUserRoom.usage = user.currentUsage - user.previousUsage;
    newUserRoom.roomBill = newUserRoom.usage * rate;
    newUserRoom.people = user.people;
    roomTotalUsage += newUserRoom.usage;

    usersRoom.push(newUserRoom);
  });

  result.commonAreaUsage = data.usage - roomTotalUsage;
  result.commonAreaBill = result.commonAreaUsage * rate;
  result.totalBill = data.bill;
  result.totalUsage = data.usage;
  result.rate = rate;
  result.rooms = usersRoom;

  return { result };
};
