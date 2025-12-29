import DashboardLayout from '@/components/layout/DashboardLayout';
import { SidebarProvider } from '@/contexts/SidebarContext';

export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SidebarProvider>
  );
}