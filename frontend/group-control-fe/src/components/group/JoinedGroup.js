import { Card } from 'antd';

const JoinedGroup = ({ group }) => {
  const { name, owner, total, imgUrl } = group;
  return (
    <Card className="group-card">
      <div style={{ display: 'flex' }}>
        <img src={imgUrl} alt={`${name}-img`} className="group-image"></img>
        <div style={{ margin: '1rem' }}>
          <h4>{name}</h4>
          <p>Owner: {owner}</p>
          <p>Total: {total} people</p>
        </div>
      </div>
    </Card>
  );
};

export default JoinedGroup;
