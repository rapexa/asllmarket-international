import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import NotificationSettings from "./pages/NotificationSettings";
import SearchResults from "./pages/SearchResults";
import AdvancedSearch from "./pages/AdvancedSearch";
import ProductDetail from "./pages/ProductDetail";
import SupplierDetail from "./pages/SupplierDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Categories from "./pages/Categories";
import OrderDetail from "./pages/OrderDetail";
import MessageDetail from "./pages/MessageDetail";
import PaymentDetail from "./pages/PaymentDetail";
import RFQResponses from "./pages/RFQResponses";
import RFQSuccess from "./pages/RFQSuccess";
import Compare from "./pages/Compare";
import Products from "./pages/Products";
import BecomeSupplier from "./pages/BecomeSupplier";
import Deals from "./pages/Deals";
import PostRequest from "./pages/PostRequest";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Press from "./pages/Press";
import HelpCenter from "./pages/HelpCenter";
import FAQ from "./pages/FAQ";
import Feedback from "./pages/Feedback";
import ForBuyers from "./pages/ForBuyers";
import ForSuppliers from "./pages/ForSuppliers";
import TradeAssurance from "./pages/TradeAssurance";
import Logistics from "./pages/Logistics";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Compliance from "./pages/Compliance";
// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminSuppliers from "./pages/admin/Suppliers";
import AdminBuyers from "./pages/admin/Buyers";
import AdminOrders from "./pages/admin/Orders";
import AdminRFQ from "./pages/admin/RFQ";
import AdminVerifications from "./pages/admin/Verifications";
import AdminCategories from "./pages/admin/Categories";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoute from "./components/auth/AdminRoute";
import AddProduct from "./pages/admin/AddProduct";
import VerificationDetail from "./pages/admin/VerificationDetail";
import AdminOrderDetail from "./pages/admin/OrderDetail";
import SalesDetails from "./pages/admin/SalesDetails";
import TopSellingProducts from "./pages/admin/TopSellingProducts";
import AdminNotifications from "./pages/admin/Notifications";
import AdminSupplierDetail from "./pages/admin/SupplierDetail";
import EditSupplier from "./pages/admin/EditSupplier";
// User Dashboards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SupplierDashboard from "./pages/dashboard/SupplierDashboard";
import MarketDashboard from "./pages/dashboard/MarketDashboard";
import VisitorDashboard from "./pages/dashboard/VisitorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
          <Routes>
            <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/notifications/settings" element={<NotificationSettings />} />
              <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/search/advanced" element={<AdvancedSearch />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/suppliers/:id" element={<SupplierDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/orders/:id/payment" element={<PaymentDetail />} />
              <Route path="/messages/:id" element={<MessageDetail />} />
            <Route path="/rfq/responses" element={<RFQResponses />} />
            <Route path="/rfq/success" element={<RFQSuccess />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/become-supplier" element={<BecomeSupplier />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/post-request" element={<PostRequest />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/press" element={<Press />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/buyers" element={<ForBuyers />} />
            <Route path="/suppliers" element={<ForSuppliers />} />
            <Route path="/trade-assurance" element={<TradeAssurance />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/compliance" element={<Compliance />} />
            {/* User Dashboards */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardIndex /></ProtectedRoute>} />
            <Route path="/dashboard/buyer" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/supplier" element={<ProtectedRoute><SupplierDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/market" element={<ProtectedRoute><MarketDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/visitor" element={<ProtectedRoute><VisitorDashboard /></ProtectedRoute>} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><AddProduct /></AdminRoute>} />
            <Route path="/admin/products/top-selling" element={<AdminRoute><TopSellingProducts /></AdminRoute>} />
            <Route path="/admin/suppliers" element={<AdminRoute><AdminSuppliers /></AdminRoute>} />
            <Route path="/admin/suppliers/:id" element={<AdminRoute><AdminSupplierDetail /></AdminRoute>} />
            <Route path="/admin/suppliers/:id/edit" element={<AdminRoute><EditSupplier /></AdminRoute>} />
            <Route path="/admin/buyers" element={<AdminRoute><AdminBuyers /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetail /></AdminRoute>} />
            <Route path="/admin/rfq" element={<AdminRoute><AdminRFQ /></AdminRoute>} />
            <Route path="/admin/verifications" element={<AdminRoute><AdminVerifications /></AdminRoute>} />
            <Route path="/admin/verifications/:id" element={<AdminRoute><VerificationDetail /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
            <Route path="/admin/subscriptions" element={<AdminRoute><AdminSuppliers /></AdminRoute>} />
            <Route path="/admin/payments" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
            <Route path="/admin/sales/details" element={<AdminRoute><SalesDetails /></AdminRoute>} />
            <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
