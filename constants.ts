import { AnalyticsData, TimeRange, Metric, UserSegment } from './types';

export const MOCK_METRICS: Metric[] = [
  { 
    id: 'users', 
    label: 'Total Users', 
    description: '期間中にサイトを訪問した固有のユーザー数です。この数字が増えると、サイトの認知度が向上していることを示します。',
    value: '124,592', 
    change: 12.5, 
    trend: 'up' 
  },
  { 
    id: 'revenue', 
    label: 'Total Revenue', 
    description: '商品販売や契約などから発生した総売上高です。ビジネスの成長を直接的に示す最も重要な指標の一つです。',
    value: '¥8,432,000', 
    change: 8.2, 
    trend: 'up' 
  },
  { 
    id: 'bounce', 
    label: 'Bounce Rate', 
    description: '1ページだけ見てサイトを離脱した割合です。この数値が低いほど、ユーザーがサイトに関心を持っていると言えます。',
    value: '42.3%', 
    change: -2.1, 
    trend: 'down' 
  }, // Down is good for bounce rate
  { 
    id: 'duration', 
    label: 'Avg. Session', 
    description: 'ユーザーが1回の訪問でサイトに滞在した平均時間です。長いほどコンテンツが魅力的であることを示唆します。',
    value: '4m 12s', 
    change: 5.4, 
    trend: 'up' 
  },
];

// Helper to generate random data based on range and segment
export const generateData = (range: TimeRange, segment: UserSegment): AnalyticsData => {
  const dataCount = range === TimeRange.Day ? 24 : range === TimeRange.Week ? 7 : range === TimeRange.Month ? 30 : 12;
  const labelPrefix = range === TimeRange.Day ? ':00' : range === TimeRange.Year ? '' : 'Day ';
  
  // Segment multiplier to simulate filtering
  let multiplier = 1;
  if (segment === UserSegment.New) multiplier = 0.6;
  else if (segment === UserSegment.Returning) multiplier = 0.4;
  else if (segment === UserSegment.Mobile) multiplier = 0.55;

  const visitors = Array.from({ length: dataCount }).map((_, i) => {
    const baseValue = Math.floor((Math.random() * 5000 + 1000) * multiplier);
    return {
      name: range === TimeRange.Year ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] : range === TimeRange.Day ? `${i}:00` : `${labelPrefix}${i + 1}`,
      value: baseValue,
      value2: Math.floor(baseValue * (0.8 + Math.random() * 0.4)), // Previous period
    };
  });

  const revenue = Array.from({ length: dataCount }).map((_, i) => ({
    name: range === TimeRange.Year ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] : range === TimeRange.Day ? `${i}:00` : `${labelPrefix}${i + 1}`,
    value: Math.floor((Math.random() * 150000 + 20000) * multiplier),
  }));

  let sources = [
    { name: 'Organic Search', value: 45 },
    { name: 'Direct', value: 25 },
    { name: 'Social', value: 20 },
    { name: 'Referral', value: 10 },
  ];

  // Adjust sources based on segment
  if (segment === UserSegment.New) {
    sources = [
      { name: 'Organic Search', value: 60 },
      { name: 'Social', value: 25 },
      { name: 'Direct', value: 10 },
      { name: 'Referral', value: 5 },
    ];
  } else if (segment === UserSegment.Returning) {
    sources = [
        { name: 'Direct', value: 50 },
        { name: 'Organic Search', value: 20 },
        { name: 'Referral', value: 20 },
        { name: 'Social', value: 10 },
    ];
  }

  let devices = [
    { name: 'Mobile', value: 58 },
    { name: 'Desktop', value: 38 },
    { name: 'Tablet', value: 4 },
  ];

  if (segment === UserSegment.Mobile) {
    devices = [
        { name: 'Mobile', value: 100 },
        { name: 'Desktop', value: 0 },
        { name: 'Tablet', value: 0 },
    ];
  }

  return { visitors, revenue, sources, devices };
};