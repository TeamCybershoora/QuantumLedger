import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilUser,
  cilGroup,
  cilChart,
  cilLink,
  cilChatBubble,
  cilCalendar,
  cilHeadphones,
  cilCreditCard,
  cilCart,
  cilChartLine,
  cilAddressBook
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import { GiKnifeFork } from 'react-icons/gi'

const _nav = [
  {
    component: CNavTitle,
    name: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GiKnifeFork size={20} color="white" /> {/* dark magenta icon */}
        <strong style={{ fontSize: '25px', color: 'blue' }}>
          Pizza Hub
        </strong>
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'Business',
  },
  {
    component: CNavItem,
    name: 'Staff',
    to: '/staff',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reservations',
    to: '/reservations',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Finance',
  },
  {
    component: CNavItem,
    name: 'Accounts',
    to: '/Accounts',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sales',
    to: 'Sales',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Purchase',
    to: '/Purchase',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payment Method',
    to: '/PaymentMethod',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'Report',
    to: '/report',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customer Support', 
    to: '/CustomerSupport',
    icon: <CIcon icon={cilHeadphones} customClassName="nav-icon" />,
  },
  
];

export default _nav;
