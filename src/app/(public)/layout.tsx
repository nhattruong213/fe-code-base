import { GuestGuard } from '@/containers/guestGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
