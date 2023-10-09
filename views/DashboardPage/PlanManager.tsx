import React, { useState } from 'react';
import { SubscriptionPlan, User } from 'types/user';
import { useChangePlan } from '../../hooks/api/useChangePlan';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth.context';
import { useMixpanel } from '../../contexts/mixpanel.context';

export type PlanManagerProps = {
  user: User;
}

export default function PlanManager({ user }: PlanManagerProps) {
  const { setUser } = useAuthContext();

  const mixpanel = useMixpanel();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(user.subscriptionPlan);

  const { mutate, isLoading } = useChangePlan({
    onSuccess: (data) => {
      setUser(data)

      mixpanel.people.set({
        'subscription_plan': data.subscriptionPlan.toLowerCase(),
      })
    },
  });

  const handleChangePlan = () => {
    mutate({
      id: user.id,
      previousPlan: user.subscriptionPlan,
      newPlan: selectedPlan,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan((event.target as HTMLInputElement).value as SubscriptionPlan);
  };

  return (
    <Stack spacing={2} sx={{ padding: 2, border: '1px solid lightGrey' }}>
      <Typography sx={{ fontSize: '1.5rem', mb: '1rem' }} component='div'>
        Your current plan: <Chip variant='outlined' color='info' label={user.subscriptionPlan}
                                 sx={{ minWidth: '100px' }} />
      </Typography>
      <FormControl>
        <FormLabel id='plan-controlled-radio-buttons-group'>Change Plan</FormLabel>
        <RadioGroup
          aria-labelledby='plan-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={selectedPlan}
          onChange={handleChange}
        >

          <FormControlLabel value={SubscriptionPlan.Free} control={<Radio />} label='Free' />
          <FormControlLabel value={SubscriptionPlan.Basic} control={<Radio />} label='Basic' />
          <FormControlLabel value={SubscriptionPlan.Team} control={<Radio />} label='Team' />
          <FormControlLabel value={SubscriptionPlan.Enterprise} control={<Radio />} label='Enterprise' />
        </RadioGroup>
      </FormControl>
      <Box>
        <Button
          variant='contained'
          disabled={user.subscriptionPlan === selectedPlan || isLoading}
          sx={{ fontSize: '1.5rem' }}
          onClick={handleChangePlan}
        >
          Change Plan
        </Button>
      </Box>
    </Stack>
  );
}
