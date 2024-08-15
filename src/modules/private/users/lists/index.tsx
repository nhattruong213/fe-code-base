import { BreadcrumbsNNT } from '@/components/molecules/breadcrumbs';
import { navPaths } from '@/constants/path';

export const UserList = () => {
  return (
    <>
      <BreadcrumbsNNT links={[{ name: 'Home', href: navPaths.dashboard }, { name: 'User', href: navPaths.user.root }, { name: 'List' }]} />
    </>
  );
};
