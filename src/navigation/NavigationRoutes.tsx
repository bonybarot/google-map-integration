// tab screens
import HomeTab from '../pages/tabbar/HomeTab';
import ProfileTab from '../pages/tabbar/ProfileTab';

import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Splash from '../pages/auth/Splash';
import OnBoarding from '../pages/auth/OnBoarding';
import ResetPassword from '../pages/auth/ResetPassword';
import GoogleMapView from '../pages/auth/GoogleMapView';
import LocationTesting from '../pages/auth/LocationTesting.tsx';
import RoutingBetweenTwoPlaces from '../pages/auth/RoutingBetweenTwoPlaces.tsx';
import LocateToThePlaces from '../pages/auth/LocateToThePlaces.tsx';
import BackgroundTesting from '../pages/auth/BackgroundTesting.tsx';
import AddressPicker from '../components/common/AddressPicker';

//home tab screens
import Drawer from './Type/DrawerNavigation';
import ListOfDataPage from './Type/homeTab/ListOfDataPage';

export const TabRoute = {
  HomeTab,
  ProfileTab,
};
export const ScreenRoute = {
  Login,
  SignUp,
  ForgotPassword,
  Splash,
  OnBoarding,
  ResetPassword,
  Drawer,
  LocationTesting,
  GoogleMapView,
  RoutingBetweenTwoPlaces,
  LocateToThePlaces,
  BackgroundTesting,

  //Home Screens
  ListOfDataPage,
  AddressPicker
};
