import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { BaseClient } from './components/client/base-client';

import { HomePage } from './pages/client/home';
import { SearchPage } from './pages/client/search';
import { ProductDetailPage } from './pages/client/productdetail';
import { CartPage } from './pages/client/cart';
import { LoginPage } from './pages/client/login';
import { RegisterPage } from './pages/client/register';

import { BaseAdmin } from './components/admin/base-admin';

import { Dashboard } from './pages/admin/dashboard';
import { AdminShowProduct } from './pages/admin/product/indexShow';
import { AdminUser } from './pages/admin/user';
import { AdminEditProduct } from './pages/admin/product/indexEdit';
import { ErrorPage } from './pages/error';
import { AdminOrder } from './pages/admin/order';
import { CheckOut } from './pages/client/checkout';
import { AdminCreateProduct } from './pages/admin/product/indexCreate';
import { AdminShowCategory } from './pages/admin/category/indexShow';
import { ProfilePage } from './pages/client/profile';
import { SendForgot } from './pages/client/forgot/indexSend';
import { ChangePassword } from './pages/client/forgot/indexChange';

function App() {
  let user = JSON.parse(localStorage.getItem("user")!)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseClient />} >
          <Route index element={<HomePage />} />
          <Route path="/productdetail/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search/keyword/:searchValue?" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sendforgot" element={<SendForgot />} />
        <Route path="/reset-password/token/:randomString" element={<ChangePassword />} />

        <Route path="/admin" element={user?.role === "Admin" ? (<BaseAdmin />) : (<ErrorPage />)} >
          <Route index element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<AdminShowProduct />} />
          <Route path="/admin/product/edit/:id" element={<AdminEditProduct />} />
          <Route path="/admin/product/create" element={<AdminCreateProduct />} />
          <Route path="/admin/category" element={<AdminShowCategory />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/user" element={<AdminUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
