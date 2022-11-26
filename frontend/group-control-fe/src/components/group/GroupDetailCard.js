import { Card, Row, Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import '../../App.css';
const GroupDetailCard = ({ group, user }) => {
  user = 'Vinh';
  const [form] = Form.useForm();
  const { id, name, imgUrl, description, owner, total } = group;
  const [updating, setUpdating] = useState(false);
  return (
    <Card className="group-detail-card">
      {user === owner ? (
        <>
          <Form
            layout="vertical"
            form={form}
            initialValues={{ layout: 'vertical' }}
          >
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
            <Form.Item label="Detail">
              <TextArea
                placeholder="detail placeholder"
                value={description}
                disabled={!updating}
                rows={6}
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
                style={{ width: '14em', height: '3em', fontSize: 18 }}
                shape="round"
                onClick={() => setUpdating(true)}
              >
                Update group profile
              </Button>
            )}
          </Row>
        </>
      ) : (
        <>
          <div className="group-short-info">
            <img
              className="group-detail-card-img"
              src={imgUrl}
              alt={`${name}-img`}
            ></img>
            <div className="group-short-info-text">
              <h4>Group name: {name}</h4>
              <p>Owner: {owner}</p>
              <p>Total: {total} people</p>
            </div>
          </div>
          <p style={{ marginTop: '2em', fontSize: '1.5em' }}>
            Detail: {description}
          </p>
        </>
      )}
    </Card>
  );
};

export default GroupDetailCard;
