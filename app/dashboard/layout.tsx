import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../../components/navigation.component';
import Copyright from '@/components/copyright.component';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      <ToastContainer />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navigation />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div>
                  {children}
                </div>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      </React.Fragment>
  );
}