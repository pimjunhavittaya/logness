import Page from 'components/Page';
import Sidebar from '../views/DashboardPage/Sidebar';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useAuthContext } from '../contexts/auth.context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      void router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Page title="Dashboard">
          <Typography sx={{ fontSize: '1.5rem', mb: '1rem' }} component="div">
            Your current plan: <Chip variant="outlined" label="Free" sx={{ minWidth: '100px' }} />
          </Typography>
          <Button variant="contained" sx={{ fontSize: '1.5rem' }}>Change Plan</Button>
        </Page>
      </Box>
    </Box>
  )
}
