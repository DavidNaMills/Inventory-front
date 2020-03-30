import React, { useEffect, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from './Components/Spinner/Spinner';
import LoginForm from './Containers/LoginForm/LoginForm';
import LogoutContainer from './Containers/LogoutContainer/LogoutContainer';
import SecureRoute from './HOC/SecureRoute/SecureRoute';
import FooterSpacing from './Components/FooterSpacing/FooterSpacing';
import MessagingDisplay from './Components/MessagingDisplay/MessagingDisplay';
import useChangeLanguage from './hooks/useChangeLanguage/useChangeLanguage';

const NavigationContainer = lazy(() => import('./Navigation/NavigationContainer/NavigationContainer'));
const DashboardSwitch = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./Containers/Dashboard/DashboardSwitch')), 3000);
  });
});

const ProductManagementContainer = lazy(() => import('./Containers/ProductManagementContainer/ProductManagementContainer'));
const StaffManagementContainer = lazy(() => import('./Containers/StaffManagementContainer/StaffManagementContainer'));
const ProductTypeManagementContainer = lazy(() => import('./Containers/ProductTypeManagementContainer/ProductTypeManagementContainer'));
const LocationManagementContainer = lazy(() => import('./Containers/LocationsManagementContainer/LocationsManagementContainer'));
const PersonalDetailsContainer = lazy(() => import('./Containers/PersonalDetailsContainer/PersonalDetailsContainer'));



function App(props) {
  const staff = useSelector(state => state.staff);
  const { initLocale } = useChangeLanguage();

  useEffect(() => {
    initLocale();
  }, []);

  useEffect(() => {
    if (staff.token) {
      props.history.push('/dashboard');
    }
  }, [staff.token])

  return (
    <div>
      {/* <Navigation userRoutes={user.routes} /> */}
      <Suspense fallback={<Spinner backImg={true}/>}>
        <Switch>
          <NavigationContainer>
            <MessagingDisplay />
            <SecureRoute level={'1'} path='/staff' exact component={StaffManagementContainer} />
            <SecureRoute level={'1'} path='/personal' exact component={PersonalDetailsContainer} />
            <SecureRoute level={'2'} path='/productTypes' exact component={ProductTypeManagementContainer} />
            <SecureRoute level={'3'} path='/locations' exact component={LocationManagementContainer} />
            <SecureRoute level={'2'} path='/products' exact component={ProductManagementContainer} />
            <SecureRoute level={'1'} path='/dashboard' exact component={DashboardSwitch} />
            <SecureRoute level={'1'} path='/logout' exact component={LogoutContainer} />
            <Route path='/' exact component={LoginForm} />
          </NavigationContainer>
        </Switch>
      </Suspense>
      <FooterSpacing />
    </div>
  );
}

export default withRouter(App);
