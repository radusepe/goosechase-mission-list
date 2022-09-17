import "./Mission.css";

type Props = {
  missions: Mission[];
};
export const Missions = ({ missions }: Props) => {
  return (
    <div className="mission-list">
      {missions.map(({ id, ...mission }, index) => {
        return (
          <div key={id}>
            <MissionComponent {...mission} />
            {index !== missions.length - 1 && <Divider />}
          </div>
        );
      })}
    </div>
  );
};

const MissionComponent = ({
  name,
  description,
  points,
  type,
}: Omit<Mission, "id">) => {
  const missionClass = `mission-type mission-${type}`;
  return (
    <div className="mission-container">
      <div className={missionClass}></div>
      <div className="mission-content">
        <div className="mission-name">{name}</div>
        <div className="mission-description">{description}</div>
      </div>
      <div className="mission-points">{points} Points</div>
    </div>
  );
};

const Divider = () => {
  return <div className="divider"></div>;
};
