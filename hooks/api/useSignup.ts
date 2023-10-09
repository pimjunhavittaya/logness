import { useMutation, UseMutationOptions } from 'react-query';
import { SubscriptionPlan, User } from '../../types/user';
import { useMixpanel } from '../../contexts/mixpanel.context';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type signupParams = {
  email: string;
  age: string;
  gender: string;
  subscriptionPlan: SubscriptionPlan,
  referrerId: string;
}

export const useSignup = (options?: UseMutationOptions<User, unknown, signupParams>) => {
  const mixpanel = useMixpanel();
  return useMutation<User, Error, signupParams, unknown>(async (params: signupParams): Promise<User> => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes)
    } else {
      const user = jsonRes as User;

      mixpanel.register({
        'age': user.age,
        'gender': user.gender.toLowerCase(),
        'subscription_plan': user.subscriptionPlan.toLowerCase(),
        'company': user.company,
      });

      mixpanel.people.set({
        'age': user.age,
        'gender': user.gender.toLowerCase(),
        'subscription_plan': user.subscriptionPlan.toLowerCase(),
        'company': user.company,
        'registration_date': dayjs().utc().format('YYYY-MM-DDTHH:mm:ss'),
        'referrer_id': '',
        'registration_method': 'email',
      });

      mixpanel.track('sign_up_completed')

      return user;
    }
  }, options);
};
