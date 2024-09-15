import { AuthProvider } from '@/hooks/AuthContext';
import Page from '@/app/page';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
}

