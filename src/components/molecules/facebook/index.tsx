import { CustomChat, FacebookProvider } from 'react-facebook';

export const FaceBookChat = () => (
  <FacebookProvider appId="1655806175261614" chatSupport>
    <CustomChat pageId="439173765936038" minimized />
  </FacebookProvider>
);
