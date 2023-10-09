import Page from 'components/Page';
import Sidebar from '../views/DashboardPage/Sidebar';
import { Box } from '@mui/material';
import { useAuthContext } from '../contexts/auth.context';
import PlanManager from '../views/DashboardPage/PlanManager';
import DeactivateBox from '../views/DashboardPage/DeactivateBox';

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuthContext();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Page title='Dashboard'>
          {user &&
            <>
              <PlanManager user={user} />
              <DeactivateBox user={user} />
            </>
          }
        </Page>
      </Box>
    </Box>
  );
}
