import { Row, Button, Card, Form, Input } from 'antd';
import { useState } from 'react';

const DashBoardCard = ({ user }) => {
  const [form] = Form.useForm();
  const { username, email, name, imgUrl } = user;
  const [updating, setUpdating] = useState(false);
  return (
    <Card className="group-detail-card">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ layout: 'vertical' }}
      >
        <Form.Item label="Username">
          <Input
            placeholder="username placeholder"
            value={username}
            disabled={!updating}
          />
        </Form.Item>
        <Form.Item label="Name">
          <Input
            placeholder="name placeholder"
            value={name}
            disabled={!updating}
          />
        </Form.Item>
        <Form.Item label="Avatar">
          <img
            src={imgUrl}
            alt={`${name}-img`}
            style={{ width: '15em', height: '15em' }}
          ></img>
          <Input
            placeholder="input placeholder"
            value={imgUrl}
            disabled={!updating}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            placeholder="input placeholder"
            value={email}
            disabled={!updating}
          />
        </Form.Item>
      </Form>
      <Row justify="center" align="middle">
        {updating ? (
          <Button
            type="primary"
            style={{ width: '10em', height: '3em', fontSize: 18 }}
            shape="round"
            onClick={() => {
              //submit Form handle
              setUpdating(false);
            }}
          >
            Confirm update
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ width: '10em', height: '3em', fontSize: 18 }}
            shape="round"
            onClick={() => setUpdating(true)}
          >
            Update profile
          </Button>
        )}
      </Row>
    </Card>
  );
};

export default DashBoardCard;
