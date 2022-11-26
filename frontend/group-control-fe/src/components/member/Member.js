import { Card, Button } from 'antd';

const Member = ({ member, kickable, setCoOwnerAble }) => {
  const { imgUrl, name, email, role, id } = member;
  return (
    <Card className="member-card">
      <div style={{ display: 'flex' }}>
        <img
          style={{ borderRadius: '80%' }}
          src={imgUrl}
          alt={`${name}-img`}
          className="member-group-image"
        ></img>
        <div style={{ margin: '0.5rem 0 0 0' }}>
          <div style={{ paddingLeft: '2em' }}>
            <h4>{name}</h4>
            <p>Email: {email} </p>
            <p>Role: {role}</p>
          </div>

          <Button
            style={{ margin: '0.5em 0.25em', width: '10em' }}
            disabled={role === 'owner' || role === 'co-owner' ? true : false}
          >
            Set Co-owner
          </Button>
          <Button style={{ margin: '0.5em 0.25em', width: '10em' }}>
            Kick
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Member;
