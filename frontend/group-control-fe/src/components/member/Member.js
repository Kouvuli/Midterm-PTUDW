import { Card } from 'antd';
const Member = ({ member, kickable, setCoOwnerAble }) => {
  const { imgUrl, name, email, role } = member;
  return (
    <Card className="member-card">
      <div style={{ display: 'flex' }}>
        <img
          src={imgUrl}
          alt={`${name}-img`}
          className="member-group-image"
        ></img>
        <div style={{ margin: '1.5rem' }}>
          <h4>{name}</h4>
          <p>Email: {email} </p>
          <p>Role: {role}</p>
          <button>Set co-owner</button>
          <button>Kick</button>
        </div>
      </div>
    </Card>
  );
};

export default Member;
