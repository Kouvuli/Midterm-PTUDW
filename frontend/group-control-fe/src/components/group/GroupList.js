import OwnedGroup from './OwnedGroup';
import JoinedGroup from './JoinedGroup';
import { Col, Row } from 'antd';
const GroupList = ({ groups, type }) => {
  return (
    <div>
      <Row>
        {groups.map((group) => (
          <Col justify="center" key={group.id}>
            {type === 'owned' ? (
              <OwnedGroup group={group} />
            ) : (
              <JoinedGroup group={group} />
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GroupList;
