import { Header } from '@/components/Header';
import { LandingPage } from '@/components/LandingPage';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <LandingPage />
    </div>
  );
};

export default Index;
