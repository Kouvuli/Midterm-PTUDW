import { Card } from 'antd';
const GroupDetailCard = ({ group }) => {
  const { id, name, imgUrl, description, owner, total } = group;
  return (
    <Card className="group-detail-card">
      <div style={{ display: 'flex' }}>
        <img
          src={imgUrl}
          alt={`${name}-img`}
          className="detail-group-image"
        ></img>
        <div style={{ margin: '1rem' }}>
          <h4>{name}</h4>
          <p>Owner: {owner}</p>
          <p>Total: {total} people</p>
        </div>
      </div>
      <p>Detail: {description}</p>
    </Card>
  );
};

export default GroupDetailCard;
