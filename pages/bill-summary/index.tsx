import { useRouter } from "next/router";
import { CalculateBill } from "../bill-calculator/calculate";
import { Bill, RoomBillType, UserRoomBill } from "@/components/utils/types";
import {
  Card,
  Col,
  Divider,
  Row,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useAppContext } from "@/components/layout/provider/AppProvider";
import { useEffect, useState } from "react";

const BillSummary: React.FC = () => {
  const { isHalfWidth } = useAppContext();
  const { Title } = Typography;
  const router = useRouter();
  const params = router.query.data;
  const [result, setResult] = useState<Bill>();

  useEffect(() => {
    try {
      const data = JSON.parse(decodeURIComponent(params as string));
      if (!data) {
        router.push("/");
      }
      const item = CalculateBill(data as any);
      setResult(item.result);
    } catch {}
  }, [params, router]);

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
      <Card>
        <Row
          gutter={10}
          className={
            isHalfWidth
              ? "flex flex-column justify-center gap-4"
              : "grid grid-cols-2 gap-5"
          }
        >
          <Col className="w-full">
            <Card bordered={true}>
              <Title type="secondary" level={3}>
                Total Usage{" "}
              </Title>
              <Divider />
              <Space className="flex justify-start item-center pl-5">
                <Title className="pt-2" level={4}>
                  {result ? `${result?.totalUsage} kWh` : `No data`}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col className="w-full">
            <Card bordered={true} style={{ width: "100%" }}>
              <Title type="secondary" level={3}>
                Total Bill
              </Title>
              <Divider />
              <Space className="flex justify-start item-center pl-5">
                <Title className="pt-2" level={4}>
                  {result ? `RM ${result?.totalBill.toFixed(2)}` : `No data`}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col className="w-full">
            <Card bordered={true} style={{ width: "100%" }}>
              <Title type="secondary" level={3}>
                Common Area Usage
              </Title>
              <Divider />
              <Space className="flex justify-start item-center pl-5">
                <Title className="pt-2" level={4}>
                  {result
                    ? `${result?.commonAreaUsage.toFixed(2)} kWh`
                    : `No data`}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col className="w-full">
            <Card bordered={true} style={{ width: "100%" }}>
              <Title type="secondary" level={3}>
                Common Area Bill
              </Title>
              <Divider />
              <Space className="flex justify-start item-center pl-5">
                <Title className="pt-2" level={4}>
                  {result
                    ? `RM ${result?.commonAreaBill.toFixed(2)}`
                    : `No data`}
                </Title>
              </Space>
            </Card>
          </Col>
        </Row>

        <Table className="mt-8" columns={columns} dataSource={result?.rooms} />
      </Card>
    </div>
  );
};

export default BillSummary;
