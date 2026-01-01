// src/components/timeline/types.ts

type ActivityType = "plan" | "actual" | "reconstructed";

interface ActivityBlock { 
  id: string;
  type: ActivityType;
  start: Date;
  end: Date;
  title: string;
  meta?: string;
  confidence?: number;
}

type ProcessedBlock = ActivityBlock & {
  lane?: number;
  laneOffset?: number;
};

const PX_PER_HOUR = 120;
const PX_PER_MIN = PX_PER_HOUR / 60;

const getTopPosition = (date: Date) => 
  (date.getHours() * PX_PER_HOUR) + (date.getMinutes() * PX_PER_MIN);

// ここで明示的にまとめてエクスポート
export type { ActivityType, ActivityBlock, ProcessedBlock };
export { PX_PER_HOUR, PX_PER_MIN, getTopPosition };