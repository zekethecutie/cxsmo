import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CxsmoDemoProvider } from "./contexts/CxsmoDemoContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CxsmoSoundProvider } from "./contexts/CxsmoSoundContext";
import { CxsmoTourProvider } from "./components/CxsmoGuidedShowcase";
import { CxsmoAdminPage } from "./pages/CxsmoAdminPage";
import { CxsmoAccountPage, CxsmoBagPage, CxsmoCheckoutPage, CxsmoDisclosurePage, CxsmoEditsPage, CxsmoHomePage, CxsmoLegalPage, CxsmoPrivacyPage, CxsmoProductPage, CxsmoShopPage, CxsmoSupportPage, CxsmoTermsPage } from "./pages/CxsmoStorefront";
import { CxsmoPosterHome } from "./pages/CxsmoPosterHome";

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
      <Route path="/cxsmo/privacy" component={CxsmoPrivacyPage} />
      <Route path="/cxsmo/terms" component={CxsmoTermsPage} />
      <Route path="/cxsmo/disclosure" component={CxsmoDisclosurePage} />
      <Route path="/cxsmo/admin" component={CxsmoAdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <CxsmoSoundProvider>
        <TooltipProvider>
          <CxsmoDemoProvider>
            <Toaster />
            <CxsmoTourProvider><Router /></CxsmoTourProvider>
          </CxsmoDemoProvider>
        </TooltipProvider>
        </CxsmoSoundProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
