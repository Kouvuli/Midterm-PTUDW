import { Col, Row } from "antd";

import Member from "./Member";

const MemberList = ({ members, role }) => (
  <div>
    <Row>
      {members.map((member) => (
        <Col justify="center" key={member.id}>
          <Member member={member} />
        </Col>
      ))}
    </Row>
  </div>
);

export default MemberList;
