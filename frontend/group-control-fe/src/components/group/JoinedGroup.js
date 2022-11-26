import { Card } from "antd";
import { redirect } from "react-router-dom";

const JoinedGroup = ({ group }) => {
  const { name, owner, total, imgUrl, id } = group;
  return (
    <a href={`/group/${id}`}>
      <Card className="group-card">
        <div style={{ display: "flex" }}>
          <img
            src={imgUrl}
            alt={`${name}-img`}
            className="joined-group-image"
          />
          <div style={{ margin: "1rem" }}>
            <h4>{name}</h4>
            <p>Owner: {owner}</p>
            <p>Total: {total} people</p>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default JoinedGroup;
