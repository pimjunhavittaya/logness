import { useMutation, UseMutationOptions } from 'react-query';
import { SUBSCRIPTION_PLAN_TIER, SubscriptionPlan, User } from '../../types/user';
import { useMixpanel } from '../../contexts/mixpanel.context';

export type ChangePlanParams = {
  id: string;
  previousPlan: SubscriptionPlan;
  newPlan: SubscriptionPlan;
}

export const useChangePlan = (options?: UseMutationOptions<User, unknown, ChangePlanParams>) => {
  const mixpanel = useMixpanel();

  return useMutation<User, Error, ChangePlanParams, unknown>(async (params: ChangePlanParams): Promise<User> => {
    const { previousPlan, newPlan } = params;

    const response = await fetch('/api/user/changePlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes);
    } else {
      const user = jsonRes as User;

      mixpanel.track('subscription_changed', {
        'change_type': SUBSCRIPTION_PLAN_TIER[newPlan] > SUBSCRIPTION_PLAN_TIER[previousPlan] ? 'upgrade' : 'downgrade',
        'previous_plan': previousPlan,
        'new_plan': newPlan,
      });
      mixpanel.people.set({
        'subscription_plan': newPlan,
      });

      return user;
    }
  }, options);
};
