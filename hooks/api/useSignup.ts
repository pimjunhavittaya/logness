import { useMutation, UseMutationOptions } from 'react-query';
import { SubscriptionPlan, User } from '../../types/user';

export type signupParams = {
  email: string;
  age: string;
  gender: string;
  subscriptionPlan: SubscriptionPlan,
}

export const useSignup = (options?: UseMutationOptions<User, unknown, signupParams>) => {
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
      return jsonRes as User;
    }
  }, options);
};
