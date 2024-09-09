import { DashBoardLayout } from '@/components/organisms/dashboard';
import { AuthGuard } from '@/containers/authGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashBoardLayout>{children}</DashBoardLayout>
    </AuthGuard>
  );
}
