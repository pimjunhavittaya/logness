export type User = {
  id: string;
  email: string;
  company: string;
  age: string;
  gender: string;
  newsletterSubscribed: boolean;
  subscriptionPlan: SubscriptionPlan
}

export enum SubscriptionPlan {
  Free = 'FREE',
  Basic = 'BASIC',
  Team = 'TEAM',
  Enterprise = 'ENTERPRISE'
}

export const SUBSCRIPTION_PLAN_TIER: Record<SubscriptionPlan, number> = {
  [SubscriptionPlan.Free]: 0,
  [SubscriptionPlan.Basic]: 1,
  [SubscriptionPlan.Team]: 2,
  [SubscriptionPlan.Enterprise]: 3,
}
