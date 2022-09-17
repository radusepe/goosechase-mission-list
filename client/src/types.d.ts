type MissionType = "photo" | "gps" | "text";
type Mission = {
  id: number;
  name: string;
  description: string;
  points: number;
  type: MissionType;
};
