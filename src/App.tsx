import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import HomeScreen from "./pages/HomeScreen";
import MapScreen from "./pages/MapScreen";
import NavigationScreen from "./pages/NavigationScreen";
import TravelPlannerScreen from "./pages/TravelPlannerScreen";
import TripHistoryScreen from "./pages/TripHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AboutScreen from "./pages/AboutScreen";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/planner" element={<TravelPlannerScreen />} />
            <Route path="/history" element={<TripHistoryScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/about" element={<AboutScreen />} />
          </Route>
          <Route path="/navigation" element={<NavigationScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
