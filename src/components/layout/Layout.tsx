
import { ReactNode, memo } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden bg-white dark:bg-rocket-gray-900">
      <div className="w-full bg-gradient-to-b from-white to-transparent dark:from-rocket-gray-900 dark:to-transparent">
        <Header />
      </div>
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
