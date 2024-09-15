import { AuthProvider } from '@/hooks/AuthContext';
import Page from '@/app/page';
import HomeScreen from './(tabs)';
import InvestmentSceen from './(tabs)/investment';


export default function RootLayout() {
  return (
    <AuthProvider>
      <InvestmentSceen />
    </AuthProvider>
  );
}

