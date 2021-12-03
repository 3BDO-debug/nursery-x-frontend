// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT_PATH = '/';
const AUTH_PATH = '/auth';
// ----------------------------------------------------------------------

export const PATH_APP = {
  root: ROOT_PATH,
  overview: path(ROOT_PATH, '/overview'),
  announcement: path(ROOT_PATH, '/announcement'),
  dashboard: {
    management: {
      staff: path(ROOT_PATH, '/staff'),
      staffMember: path(ROOT_PATH, '/staff-member'),
      parents: path(ROOT_PATH, '/parents'),
      parentProfile: path(ROOT_PATH, '/parent-profile'),
      kids: path(ROOT_PATH, '/kids'),
      kidProfile: path(ROOT_PATH, '/kid-profile'),
      classes: path(ROOT_PATH, 'classes'),
      classDetails: path(ROOT_PATH, '/class-details'),
      meetings: path(ROOT_PATH, '/meetings')
    },
    resources: {
      storage: path(ROOT_PATH, '/storage')
    },
    others: {
      messenger: path(ROOT_PATH, '/messenger')
    }
  }
};

export const PATH_AUTH = {
  root: AUTH_PATH,
  register: path(AUTH_PATH, '/register'),
  login: path(AUTH_PATH, '/login')
};
