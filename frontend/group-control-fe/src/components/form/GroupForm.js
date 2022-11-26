import { Button, Form, Input } from "antd";

const { TextArea } = Input;

const GroupForm = () => (
  <Form
    name="basic"
    labelCol={{ span: 10 }}
    wrapperCol={{ span: 20 }}
    initialValues={{ remember: true }}
    autoComplete="off"
  >
    <Form.Item
      label="Group name"
      name="groupname"
      rules={[{ required: true, message: "Please input your group name!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="groupdescription"
      rules={[{ required: true, message: "Describe your group!" }]}
    >
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form.Item>
  </Form>
);

export default GroupForm;
