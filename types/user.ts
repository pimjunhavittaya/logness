export type User = {
  id: string;
  email: string;
  company: string;
  age: string;
  gender: string;
  isSubscribed: boolean;
  subscriptionPlan: SubscriptionPlan
}

export enum SubscriptionPlan {
  Free = 'FREE',
  Basic = 'BASIC',
  Team = 'TEAM',
  Enterprise = 'ENTERPRISE'
}
