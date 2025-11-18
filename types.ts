export enum TimeRange {
  Day = '24H',
  Week = '7D',
  Month = '30D',
  Year = '1Y'
}

export enum UserSegment {
  All = 'All Users',
  New = 'New Visitors',
  Returning = 'Returning Users',
  Mobile = 'Mobile Traffic'
}

export enum ChartType {
  Area = 'AREA',
  Bar = 'BAR',
  Line = 'LINE',
  Pie = 'PIE'
}

export interface DataPoint {
  name: string;
  value: number;
  value2?: number; // Secondary metric for comparison
  [key: string]: any;
}

export interface Metric {
  id: string;
  label: string;
  description?: string; // For beginner tooltips
  value: string;
  change: number; // Percentage change
  trend: 'up' | 'down' | 'neutral';
}

export interface AnalyticsData {
  visitors: DataPoint[];
  revenue: DataPoint[];
  sources: DataPoint[];
  devices: DataPoint[];
}