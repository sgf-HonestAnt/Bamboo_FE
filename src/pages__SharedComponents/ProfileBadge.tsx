type ProfileBadgeProps = {
  avatar: string;
  level: number | null;
};

const ProfileBadge = (props: ProfileBadgeProps) => {
  const { avatar, level } = props;
  return (
    <>
      <div>BADGES!</div>
      <div className='profile-badge__holder m-1'>
        <img
          className='profile-badge__holder-img'
          alt=''
          src={avatar}
        />
        <div className='profile-badge__level'>
          <span>{level}</span>
        </div>
      </div>
    </> 
  );
};

export default ProfileBadge;
