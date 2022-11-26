import { Col, Row } from "antd";

import JoinedGroup from "./JoinedGroup";
import OwnedGroup from "./OwnedGroup";

const GroupList = ({ groups, type }) => (
  <div>
    <Row>
      {groups.map((group) => (
        <Col justify="center" key={group.id}>
          {type === "owned" ? (
            <OwnedGroup group={group} />
          ) : (
            <JoinedGroup group={group} />
          )}
        </Col>
      ))}
    </Row>
  </div>
);

export default GroupList;
