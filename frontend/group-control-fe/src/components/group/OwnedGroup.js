import { Card } from "antd";
import "../../App.css";

const OwnedGroup = ({ group }) => {
  const { name, total, imgUrl } = group;
  return (
    <a href={`/group/${group.id}`}>
      <Card className="group-card">
        <div style={{ display: "flex" }}>
          <img src={imgUrl} alt={`${name}-img`} className="owned-group-image" />
          <div style={{ margin: "1.5rem" }}>
            <h4>{name}</h4>
            <p>Total: {total} people</p>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default OwnedGroup;
