import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./contexts/CartContext";
import { CxsmoDemoProvider } from "./contexts/CxsmoDemoContext";
import { KinformDemoProvider } from "./contexts/KinformDemoContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { CxsmoAdminPage } from "./pages/CxsmoAdminPage";
import { CxsmoAccountPage, CxsmoBagPage, CxsmoCheckoutPage, CxsmoEditsPage, CxsmoHomePage, CxsmoLegalPage, CxsmoProductPage, CxsmoShopPage, CxsmoSupportPage } from "./pages/CxsmoStorefront";
import { CxsmoPosterHome } from "./pages/CxsmoPosterHome";
import { KinformAdminPage } from "./pages/KinformAdminPage";
import { KinformAccountPage, KinformBagPage, KinformCollectionPage, KinformInventoryPage, KinformJournalEntryPage, KinformJournalPage, KinformProductPage, KinformSupportPage } from "./pages/KinformPages";

// KINFORM is a fictional portfolio fashion concept; the underlying KNIALL commerce
// foundation remains available for future work but is not represented by this route.
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={CxsmoPosterHome} />
      <Route path="/cxsmo" component={CxsmoPosterHome} />
      <Route path="/cxsmo/shop" component={CxsmoShopPage} />
      <Route path="/cxsmo/products/:id" component={CxsmoProductPage} />
      <Route path="/cxsmo/edits" component={CxsmoEditsPage} />
      <Route path="/cxsmo/support" component={CxsmoSupportPage} />
      <Route path="/cxsmo/account" component={CxsmoAccountPage} />
      <Route path="/cxsmo/bag" component={CxsmoBagPage} />
      <Route path="/cxsmo/checkout" component={CxsmoCheckoutPage} />
      <Route path="/cxsmo/legal" component={CxsmoLegalPage} />
      <Route path="/cxsmo/admin" component={CxsmoAdminPage} />
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
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <CartProvider>
            <CxsmoDemoProvider>
              <KinformDemoProvider>
                <Toaster />
                <Router />
              </KinformDemoProvider>
            </CxsmoDemoProvider>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
