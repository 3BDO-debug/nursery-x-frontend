import { Icon } from '@iconify/react';
// routes
import { PATH_APP } from '../../routes/paths';
// components

// ----------------------------------------------------------------------

export const dashboardSidebarConfig = [
  // OVERVIEW
  // ----------------------------------------------------------------------
  {
    subheader: 'overview',
    items: [
      {
        title: 'Overview',
        path: PATH_APP.overview,
        icon: <Icon icon="ant-design:home-filled" width={20} height={20} />
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Staff',
        path: PATH_APP.dashboard.management.staff,
        icon: <Icon icon="clarity:employee-group-line" width={50} height={50} />
      },
      {
        title: 'Parents',
        path: PATH_APP.dashboard.management.parents,
        icon: <Icon icon="carbon:pedestrian-family" width={20} height={20} />
      },
      {
        title: 'Kids',
        path: PATH_APP.dashboard.management.kids,
        icon: <Icon icon="healthicons:child-care" width={40} height={40} />
      },
      {
        title: 'Classes',
        path: PATH_APP.dashboard.management.classes,
        icon: <Icon icon="fluent:class-24-filled" width={40} height={40} />
      },
      {
        title: 'Meetings',
        path: PATH_APP.dashboard.management.meetings,
        icon: <Icon icon="akar-icons:schedule" width={40} height={40} />
      }
    ]
  },
  {
    subheader: 'resources',
    items: [
      {
        title: 'Storage',
        path: PATH_APP.dashboard.resources.storage,
        icon: <Icon icon="carbon:block-storage-alt" width={40} height={40} />
      }
    ]
  },
  {
    subheader: 'others',
    items: [
      {
        title: 'Messenger',
        path: PATH_APP.dashboard.others.messenger,
        icon: <Icon icon="majesticons:messages" width={40} height={40} />
      }
    ]
  }
];

export const interfaceSidebarConfig = [
  // OVERVIEW
  // ----------------------------------------------------------------------
  {
    subheader: 'overview',
    items: [
      {
        title: 'Overview',
        path: PATH_APP.overview,
        icon: <Icon icon="ant-design:home-filled" width={20} height={20} />
      }
    ]
  },

  // SHORTCUTS
  // ----------------------------------------------------------------------
  {
    subheader: 'shortcuts',
    items: [
      {
        title: 'My kids',
        path: PATH_APP.dashboard.management.kids,
        icon: <Icon icon="ic:baseline-child-care" width={40} height={40} />
      },
      {
        title: 'Classes',
        path: PATH_APP.dashboard.management.classes,
        icon: <Icon icon="la:chalkboard-teacher" width={40} height={40} />
      },

      {
        title: 'Meetings',
        path: PATH_APP.dashboard.management.meetings,
        icon: <Icon icon="akar-icons:schedule" width={40} height={40} />
      }
    ]
  },
  {
    subheader: 'others',
    items: [
      {
        title: 'Messenger',
        path: PATH_APP.dashboard.others.messenger,
        icon: <Icon icon="majesticons:messages" width={40} height={40} />
      }
    ]
  }
];
