import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CxsmoDemoProvider } from "./contexts/CxsmoDemoContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CxsmoSoundProvider } from "./contexts/CxsmoSoundContext";
import { useCxsmoSound } from "./contexts/CxsmoSoundContext";
import { CxsmoTourProvider } from "./components/CxsmoGuidedShowcase";
import { CxsmoThemeWash } from "./components/CxsmoThemeWash";
import { CxsmoPublicMediaFallback } from "./components/CxsmoPublicMediaFallback";
import { CxsmoStudioGate } from "./pages/CxsmoAdminPage";
import { CxsmoAccountPage, CxsmoBagPage, CxsmoCheckoutPage, CxsmoDisclosurePage, CxsmoEditsPage, CxsmoHomePage, CxsmoLegalPage, CxsmoPrivacyPage, CxsmoProductPage, CxsmoShopPage, CxsmoSupportPage, CxsmoTermsPage } from "./pages/CxsmoStorefront";
import { CxsmoPosterHome } from "./pages/CxsmoPosterHome";
import { CxsmoEntryPage } from "./pages/CxsmoEntryPage";
import { CxsmoAccountActivityPage, CxsmoAccountHomePage, CxsmoAccountProfilePage, CxsmoAccountSavedFitsPage, CxsmoAccountSavesPage } from "./pages/CxsmoAccountPages";
import "./pages/cxsmo-editorial-system.css";

function Router() {
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();
  const { play } = useCxsmoSound();
  const previousLocation = useRef<string | null>(null);
  useEffect(() => {
    if (previousLocation.current === null) { previousLocation.current = location; return; }
    if (previousLocation.current === location) return;
    previousLocation.current = location;
    if (reducedMotion) return;
    const timer = window.setTimeout(() => play("chapter"), 90);
    return () => window.clearTimeout(timer);
  }, [location, play, reducedMotion]);
  // make sure to consider if you need authentication for certain routes
  return (
    <><AnimatePresence mode="wait" initial={false}>{!reducedMotion && <motion.div className="cxsmo-route-wipe" key={`wipe-${location}`} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"] }} transition={{ duration: .68, ease: [0.77, 0, .175, 1], times: [0, .38, 1] }} />}</AnimatePresence><AnimatePresence mode="wait" initial={false}><motion.div className="cxsmo-route-transition" key={location} initial={reducedMotion ? false : { opacity: 0, y: 14, scale: .985, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, y: -8, scale: 1.01, filter: "blur(3px)" }} transition={{ duration: .38, ease: [0.16, 1, .3, 1] }}><Switch>
      <Route path="/" component={CxsmoEntryPage} />
      <Route path="/cxsmo" component={CxsmoPosterHome} />
      <Route path="/cxsmo/shop" component={CxsmoShopPage} />
      <Route path="/cxsmo/products/:id" component={CxsmoProductPage} />
      <Route path="/cxsmo/edits" component={CxsmoEditsPage} />
      <Route path="/cxsmo/support" component={CxsmoSupportPage} />
      <Route path="/cxsmo/information" component={CxsmoSupportPage} />
      <Route path="/cxsmo/account" component={CxsmoAccountHomePage} />
      <Route path="/cxsmo/account/profile" component={CxsmoAccountProfilePage} />
      <Route path="/cxsmo/account/saves" component={CxsmoAccountSavesPage} />
      <Route path="/cxsmo/account/fits" component={CxsmoAccountSavedFitsPage} />
      <Route path="/cxsmo/account/activity" component={CxsmoAccountActivityPage} />
      <Route path="/cxsmo/bag" component={CxsmoBagPage} />
      <Route path="/cxsmo/checkout" component={CxsmoCheckoutPage} />
      <Route path="/cxsmo/legal" component={CxsmoLegalPage} />
      <Route path="/cxsmo/privacy" component={CxsmoPrivacyPage} />
      <Route path="/cxsmo/terms" component={CxsmoTermsPage} />
      <Route path="/cxsmo/disclosure" component={CxsmoDisclosurePage} />
      <Route path="/cxsmo/admin" component={CxsmoStudioGate} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch></motion.div></AnimatePresence></>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
	      <CxsmoSoundProvider>
	      <TooltipProvider>
	        <CxsmoDemoProvider>
	          <CxsmoPublicMediaFallback />
	          <Toaster />
	          <CxsmoThemeWash />
	          <CxsmoTourProvider><Router /></CxsmoTourProvider>
          </CxsmoDemoProvider>
        </TooltipProvider>
        </CxsmoSoundProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
