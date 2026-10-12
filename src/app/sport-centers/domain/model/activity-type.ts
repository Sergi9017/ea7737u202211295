export const ACTIVITY_TYPES = ['fitness', 'yoga', 'swimming', 'cycling'] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];
