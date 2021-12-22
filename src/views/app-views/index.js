import React, { lazy, Suspense,useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import firebase from '../../firebase';

export const AppViews = () => {
  useEffect(() => {
    getTokens();
  }, [])
  const getTokens = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token:', token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/apps`} component={lazy(() => import(`./apps`))} />
        <Route path={`${APP_PREFIX_PATH}/components`} component={lazy(() => import(`./components`))} />
        <Route path={`${APP_PREFIX_PATH}/pages`} component={lazy(() => import(`./pages`))} />
        <Route path={`${APP_PREFIX_PATH}/maps`} component={lazy(() => import(`./maps`))} />
        <Route path={`${APP_PREFIX_PATH}/charts`} component={lazy(() => import(`./charts`))} />
        <Route path={`${APP_PREFIX_PATH}/docs`} component={lazy(() => import(`./docs`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/apps`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
