import { ADMIN_DASHBOARD_PAGE } from '@/lib/constants/routes';
import React from 'react'

export default function useWindowPathname() {
  const [isWindow] = React.useState(window.location.pathname !== ADMIN_DASHBOARD_PAGE && (
    typeof window !== 'undefined'));
  return isWindow;
}
