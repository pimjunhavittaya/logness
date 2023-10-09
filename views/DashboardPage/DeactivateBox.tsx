import { User } from 'types/user';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDeactivateUser } from '../../hooks/api/useDeactiveUser';
import { useAuthContext } from '../../contexts/auth.context';
import { useMixpanel } from '../../contexts/mixpanel.context';

export type DeactivateBoxProps = {
  user: User;
}

export default function DeactivateBox({ user }: DeactivateBoxProps) {
  const [reason, setReason] = useState<string>('');
  const { logout } = useAuthContext();
  const mixpanel = useMixpanel();

  const { mutate, isLoading, isSuccess } = useDeactivateUser({
    onSuccess: () => {
      mixpanel.track('user_deactivated', {
        reason,
      });

      void logout();
    },
  });

  const handleDeactivate = () => {
    void mutate({ id: user.id });
  };

  if (isLoading || isSuccess) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid lightGrey' }}>
      <form onSubmit={handleDeactivate}>
        <Stack spacing={2}>
          <TextField
            placeholder='Deactive reason'
            required
            value={reason}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setReason(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <Box>
            <Button
              type='submit'
              color='error'
              variant='contained'
            >
              Deactivate account
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
