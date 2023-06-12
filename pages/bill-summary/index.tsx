import { useRouter } from "next/router";
import { CalculateBill } from "../bill-calculator/calculate";
import { Bill, RoomBillType, UserRoomBill } from "@/components/utils/types";
import { Card, Table, TableColumnsType } from "antd";

const BillSummary: React.FC = () => {
  const router = useRouter();
  const params = router.query.data;
  const data = JSON.parse(decodeURIComponent(params as string));

  const result = CalculateBill(data as any);

  const columns: TableColumnsType<UserRoomBill> = [
    {
      title: "Room",
      dataIndex: "roomID",
      width: 200,
    },
    {
      title: "Power Usage",
      dataIndex: "usage",
      render: (_, val) => <div>{val.usage.toFixed(2)}</div>,
    },
    {
      title: "Bill",
      dataIndex: "roomBill",
      render: (_, val) => <div>RM{val.roomBill.toFixed(2)}</div>,
    },
    {
      title: "People",
      dataIndex: "people",
    },
    {
      title: "Bill for each 1 people",
      render: (_, val) => <div>RM{(val.roomBill / val.people).toFixed(2)}</div>,
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={result.result.rooms} />
    </div>
  );
};

export default BillSummary;
