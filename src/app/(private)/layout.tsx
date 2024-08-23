import { DashBoardLayout } from '@/components/organisms/dashboard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
