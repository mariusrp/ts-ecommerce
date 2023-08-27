import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from './Store'
import CartPage from './pages/CartPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ShippingAddressPage from './pages/ShippingAddressPage.tsx'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx'
import ProtectedUserRoute from './components/ProtectedUserRoute.tsx'
import PlaceOrderPage from './pages/PlaceOrderPage.tsx'
import OrderPage from './pages/OrderPage.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistoryPage from './pages/OrderHistoryPage.tsx'
import React from 'react'
import ProductsPage from './pages/ProductsPage.tsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.tsx'
import AdminUsersPage from './pages/AdminUsersPage.tsx'
import AdminOrderlistPage from './pages/AdminOrderlistPage.tsx'
import AdminUserOrderlistPage from './pages/AdminUserOrderListPage.tsx'
import AdminProductlistPage from './pages/AdminProductlistPage.tsx'
import AdminEditProductsPage from './pages/AdminEditProductsPage.tsx'
import AdminDashboardPage from './pages/AdminDashboardPage.tsx'
import AdminCreateProductPage from './pages/AdminCreateProductPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="search" element={<ProductsPage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedUserRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="orderhistory" element={<OrderHistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="" element={<ProtectedAdminRoute />}>
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/orderlist" element={<AdminOrderlistPage />} />
        <Route
          path="admin/orderlist/:id"
          element={<AdminUserOrderlistPage />}
        />
        <Route path="admin/productlist" element={<AdminProductlistPage />} />
        <Route
          path="admin/productlist/:id/edit"
          element={<AdminEditProductsPage />}
        />
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route
          path="admin/productlist/create"
          element={<AdminCreateProductPage />}
        />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ clientId: 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
)
