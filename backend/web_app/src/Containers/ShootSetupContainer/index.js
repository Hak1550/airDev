import Loader from 'Components/Loader';
import React from 'react';
import { lazy } from 'react';
// import ShootSetupPage from '../../Pages/ShootSetupPage';
const ShootSetupPage = lazy(() => import('../../Pages/ShootSetupPage'));

const ShootSetupContainer = () => {
  // return <ShootSetupPage />;
  return (
    <React.Suspense fallback={<Loader />}>
      <ShootSetupPage />
    </React.Suspense>
  );
};

export default ShootSetupContainer;
