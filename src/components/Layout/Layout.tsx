import React from 'react';
import stylesModule from './Layout.module.sass';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className={stylesModule.appContainer}>
      <header className={stylesModule.header}>
        <div className={stylesModule.logo}>MyApp</div>
        <div className={stylesModule.userMenu}><button onClick={handleLogout}>Logout</button></div>
      </header>

      <aside className={stylesModule.sidebar}>
        <a href="#products" className={stylesModule.navItem}>Productos</a>
        <a href="#/products/create" className={stylesModule.navItem}>Agregar Producto</a>
        <a href="#users" className={stylesModule.navItem}>Users</a>
      </aside>

      <main className={stylesModule.mainContent}>
        <div className={stylesModule.contentWrapper}>
          {children}
        </div>
      </main>

      <footer className={stylesModule.footer}>
        © 2024 MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
