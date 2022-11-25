import { Col, Row } from 'antd';
import Member from './Member';
const MemberList = ({ members, role }) => {
  return (
    <div>
      <Row>
        {members.map((member) => (
          <Col justify="center" key={member.id}>
            <Member member={member}></Member>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MemberList;
