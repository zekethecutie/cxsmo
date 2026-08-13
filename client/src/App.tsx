import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./contexts/CartContext";
import { KinformDemoProvider } from "./contexts/KinformDemoContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { KinformAdminPage } from "./pages/KinformAdminPage";
import { KinformAccountPage, KinformBagPage, KinformCollectionPage, KinformInventoryPage, KinformJournalEntryPage, KinformJournalPage, KinformProductPage, KinformSupportPage } from "./pages/KinformPages";

// KINFORM is a fictional portfolio fashion concept; the underlying KNIALL commerce
// foundation remains available for future work but is not represented by this route.
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kinform" component={Home} />
      <Route path="/kinform/collection" component={KinformCollectionPage} />
      <Route path="/kinform/inventory" component={KinformInventoryPage} />
      <Route path="/kinform/products/:id" component={KinformProductPage} />
      <Route path="/kinform/journal" component={KinformJournalPage} />
      <Route path="/kinform/journal/passage" component={KinformJournalEntryPage} />
      <Route path="/kinform/support" component={KinformSupportPage} />
      <Route path="/kinform/account" component={KinformAccountPage} />
      <Route path="/kinform/bag" component={KinformBagPage} />
      <Route path="/kinform/admin" component={KinformAdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <KinformDemoProvider>
              <Toaster />
              <Router />
            </KinformDemoProvider>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
