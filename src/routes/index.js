import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// routes
import { PATH_APP, PATH_AUTH } from './paths';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// contexts
import {
  AuthProvider,
  UsersProvider,
  ClassesProvider,
  KidsProvider,
  MeetingsProvider,
  AnnouncementsProvider,
  MessengerProvider
} from '../contexts';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: PATH_APP.root,
      element: (
        <AuthProvider>
          <UsersProvider>
            <AnnouncementsProvider>
              <MeetingsProvider>
                <KidsProvider>
                  <ClassesProvider>
                    <DashboardLayout />
                  </ClassesProvider>
                </KidsProvider>
              </MeetingsProvider>
            </AnnouncementsProvider>
          </UsersProvider>
        </AuthProvider>
      ),
      children: [
        { element: <Navigate to={PATH_APP.overview} replace /> },
        { path: PATH_APP.overview, element: <Overview /> },
        { path: `${PATH_APP.announcement}/:announcementId`, element: <Announcement /> },
        { path: PATH_APP.dashboard.management.staff, element: <Staff /> },
        { path: `${PATH_APP.dashboard.management.staffMember}/:staffMemberId`, element: <StaffMember /> },
        { path: PATH_APP.dashboard.management.parents, element: <Parents /> },
        { path: `${PATH_APP.dashboard.management.parentProfile}/:parentId`, element: <ParentProfile /> },
        { path: PATH_APP.dashboard.management.kids, element: <Kids /> },
        { path: `${PATH_APP.dashboard.management.kidProfile}/:kidId`, element: <KidProfile /> },
        { path: PATH_APP.dashboard.management.classes, element: <Classes /> },
        { path: `${PATH_APP.dashboard.management.classDetails}/:classId`, element: <ClassDetails /> },
        { path: PATH_APP.dashboard.management.meetings, element: <Meetings /> },
        {
          path: PATH_APP.dashboard.others.messenger,
          element: (
            <MessengerProvider>
              <Messenger />
            </MessengerProvider>
          )
        }
      ]
    },
    {
      path: '/auth',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to={PATH_AUTH.register} replace /> },
        { path: PATH_AUTH.register, element: <Register /> },
        { path: PATH_AUTH.login, element: <Login /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Overview = Loadable(lazy(() => import('../pages/Overview')));
const Announcement = Loadable(lazy(() => import('../pages/Announcement')));
const Staff = Loadable(lazy(() => import('../pages/Staff')));
const StaffMember = Loadable(lazy(() => import('../pages/StaffMember')));
const Parents = Loadable(lazy(() => import('../pages/Parents')));
const ParentProfile = Loadable(lazy(() => import('../pages/ParentProfile')));
const Kids = Loadable(lazy(() => import('../pages/Kids')));
const KidProfile = Loadable(lazy(() => import('../pages/KidProfile')));
const Classes = Loadable(lazy(() => import('../pages/Classes')));
const ClassDetails = Loadable(lazy(() => import('../pages/ClassDetails')));
const Meetings = Loadable(lazy(() => import('../pages/Meetings')));
const Messenger = Loadable(lazy(() => import('../pages/Messenger')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Register = Loadable(lazy(() => import('../pages/Register')));
const Login = Loadable(lazy(() => import('../pages/Login')));
// Main
