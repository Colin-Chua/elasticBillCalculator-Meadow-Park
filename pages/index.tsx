"use-client";

import { useAppContext } from "@/components/layout/provider/AppProvider";
import { RoomBillType, RoomUserType } from "@/components/utils/types";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Row,
  Checkbox,
  InputNumber,
  Col,
} from "antd";
import _ from "lodash";
import { useRouter } from "next/router";

const BillForm: React.FC<any> = () => {
  const INPUT_SIZE = 200;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { isHalfWidth } = useAppContext();
  const router = useRouter();

  const onFinish = (values: any) => {
    const params: RoomBillType = {
      usage: 0,
      bill: 0,
      users: [],
    };
    const users: RoomUserType[] = [];

    params.usage = values.usage;
    params.bill = values.bill;

    const data = _.omit(values, ["usage", "bill"]);

    const roomKeys = Object.keys(data);

    roomKeys.map((key, index) => {
      const room = data[key];

      if (room.rented !== undefined) {
        if (room.people === undefined) {
          room.people = 1;
        }
        users.push(_.omit(room, ["rented"]) as any);
      }
    });

    params.users = users;

    router.push(`bill-summary?data=${encodeURIComponent(JSON.stringify(params))}`)
  };

  return (
    <div className="flex justify-center flex-col ">
      <Title level={2}>Meadow Park Room Electricity Bill Calculation</Title>

      <Card>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row
            className={
              isHalfWidth ? "flex flex-col gap-5" : "grid grid-cols-2 gap-5"
            }
          >
            <Col>
              <Card>
                <Form.Item name="usage" label="Electric Usage" required>
                  <InputNumber className="w-full" step="0.000" />
                </Form.Item>
              </Card>
            </Col>
            <Col>
              <Card>
                <Form.Item name="bill" label="Electric Bill" required>
                  <InputNumber className="w-full" step="0.00" />
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <Form.Item valuePropName="checked" name={["room1", "rented"]}>
            <Checkbox>
              <Title level={3}>Room 1 (B1)</Title>
            </Checkbox>
          </Form.Item>
          <Row
            className={isHalfWidth ? "flex flex-col" : "grid grid-cols-3 gap-5"}
          >
            <Form.Item name={["room1", "previousUsage"]} label="Previous Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item name={["room1", "currentUsage"]} label="Current Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item
              name={["room1", "people"]}
              label="Number of people ( optional )"
            >
              <InputNumber
                style={{ width: INPUT_SIZE }}
                max={10}
                defaultValue={1}
              />
            </Form.Item>
          </Row>
          <Form.Item name={["room2", "rented"]} valuePropName="checked">
            <Checkbox>
              <Title level={3}>Room 2 (B2)</Title>
            </Checkbox>
          </Form.Item>
          <Row
            className={isHalfWidth ? "flex flex-col" : "grid grid-cols-3 gap-5"}
          >
            <Form.Item name={["room2", "previousUsage"]} label="Previous Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item name={["room2", "currentUsage"]} label="Current Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item
              name={["room2", "people"]}
              label="Number of people ( optional )"
            >
              <InputNumber
                style={{ width: INPUT_SIZE }}
                max={10}
                defaultValue={1}
              />
            </Form.Item>
          </Row>
          <Form.Item name={["room3", "rented"]} valuePropName="checked">
            <Checkbox>
              <Title level={3}>Room 3 (B3)</Title>
            </Checkbox>
          </Form.Item>
          <Row
            className={isHalfWidth ? "flex flex-col" : "grid grid-cols-3 gap-5"}
          >
            <Form.Item name={["room3", "previousUsage"]} label="Previous Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item name={["room3", "currentUsage"]} label="Current Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item
              name={["room3", "people"]}
              label="Number of people ( optional )"
            >
              <InputNumber
                style={{ width: INPUT_SIZE }}
                max={10}
                defaultValue={1}
              />
            </Form.Item>
          </Row>
          <Form.Item name={["room4", "rented"]} valuePropName="checked">
            <Checkbox>
              <Title level={3}>Room 4 (B4)</Title>
            </Checkbox>
          </Form.Item>
          <Row
            className={isHalfWidth ? "flex flex-col" : "grid grid-cols-3 gap-5"}
          >
            <Form.Item name={["room4", "previousUsage"]} label="Previous Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item name={["room4", "currentUsage"]} label="Current Usage">
              <InputNumber style={{ width: INPUT_SIZE }} step="0.00" />
            </Form.Item>
            <Form.Item
              name={["room4", "people"]}
              label="Number of people ( optional )"
            >
              <InputNumber
                style={{ width: INPUT_SIZE }}
                max={10}
                defaultValue={1}
              />
            </Form.Item>
          </Row>

          <Button type="primary" className="bg-sky-600" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BillForm;
