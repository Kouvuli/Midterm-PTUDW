import { Card } from 'antd';
import '../../App.css';
const OwnedGroup = ({ group }) => {
  const { name, total, imgUrl } = group;
  return (
    <Card className="group-card">
      <div style={{ display: 'flex' }}>
        <img src={imgUrl} alt={`${name}-img`} className="group-image"></img>
        <div style={{ margin: '1.5rem' }}>
          <h4>{name}</h4>
          <p>Total: {total} people</p>
        </div>
      </div>
    </Card>
  );
};

export default OwnedGroup;
