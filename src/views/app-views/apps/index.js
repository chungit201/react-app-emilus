import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Apps = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route path={`${match.url}/home`} component={lazy(() => import(`./home`))} />
      <Route path={`${match.url}/mail`} component={lazy(() => import(`./mail`))} />
      <Route path={`${match.url}/chat`} component={lazy(() => import(`./chat`))} />
      <Route path={`${match.url}/calendar`} component={lazy(() => import(`./calendar`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/home`} />
    </Switch>
  </Suspense>
);

export default Apps;