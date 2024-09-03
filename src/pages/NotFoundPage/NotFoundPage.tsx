// src/pages/NotFoundPage.tsx

import React from 'react';
import stylesModule from './NotFoundPage.module.sass';

const NotFoundPage: React.FC = () => {
  return (
    <div className={stylesModule.container}>
      <h1 className={stylesModule.title}>404</h1>
      <p className={stylesModule.message}>Página no encontrada</p>
      <a className={stylesModule.link} href="/">Volver a la página principal</a>
    </div>
  );
};

export default NotFoundPage;
