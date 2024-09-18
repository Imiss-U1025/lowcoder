import { default as App } from "antd/es/app";
import { default as ConfigProvider } from "antd/es/config-provider";
import {
  ALL_APPLICATIONS_URL,
  APP_EDITOR_URL,
  APPLICATION_VIEW_URL,
  BASE_URL,
  DATASOURCE_CREATE_URL,
  DATASOURCE_EDIT_URL,
  DATASOURCE_URL,
  IMPORT_APP_FROM_TEMPLATE_URL,
  INVITE_LANDING_URL,
  QUERY_LIBRARY_URL,
  ADMIN_APP_URL,
} from "constants/routesURL";
import React from "react";
import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import { connect, Provider } from "react-redux";
import { Redirect, Router, Switch } from "react-router-dom";
import type { AppState } from "redux/reducers";
import { fetchConfigAction } from "redux/reduxActions/configActions";
import { fetchUserAction } from "redux/reduxActions/userActions";
import { reduxStore } from "redux/store/store";
import { developEnv } from "util/envUtils";
import history from "util/history";
import LazyRoute from "components/LazyRoute";
import { getAntdLocale } from "i18n/antdLocale";
import { trans } from "i18n"; // language
import { loadComps } from "comps";
import { initApp } from "util/commonUtils";
import { favicon } from "assets/images";
import { hasQueryParam } from "util/urlUtils";
import { isFetchUserFinished } from "redux/selectors/usersSelectors"; // getCurrentUser, 
import { getIsCommonSettingFetched } from "redux/selectors/commonSettingSelectors";
import GlobalInstances from 'components/GlobalInstances';
// import posthog from 'posthog-js'
import { fetchHomeData } from "./redux/reduxActions/applicationActions";

const LazyInviteLanding = React.lazy(() => import("pages/common/inviteLanding"));
const LazyComponentDoc = React.lazy(() => import("pages/ComponentDoc"));
const LazyComponentPlayground = React.lazy(() => import("pages/ComponentPlayground"));
const LazyAppEditor = React.lazy(() => import("pages/editor/AppEditor"));
const LazyDebugComp = React.lazy(() => import("./debug"));
const LazyDebugNewComp = React.lazy(() => import("./debugNew"));

const Wrapper = (props: { children: React.ReactNode, language: string }) => (
  <ConfigProvider
    theme={{ hashed: false }}
    locale={getAntdLocale(props.language)}
  >
    <App>
      <GlobalInstances />
      {props.children}
    </App>
  </ConfigProvider>
);

type AppIndexProps = {
  currentOrgId?: string;
  currentUserId: string;
  currentUserAnonymous: boolean;
  orgDev: boolean;
  defaultHomePage: string | null | undefined;
  getCurrentUser: () => void;
};

class AppIndex extends React.Component<AppIndexProps, any> {
  componentDidMount() {
    this.props.getCurrentUser();
    // if (!this.props.currentUserAnonymous) {
    //   this.props.fetchHomeData(this.props.currentUserAnonymous);
    // }
  }

  componentDidUpdate(prevProps: AppIndexProps) {
  }
  render() {
    const isTemplate = hasQueryParam('template');
    const pathname = history.location.pathname;

    // we check if we are on the public cloud
    const isLowCoderDomain = window.location.hostname === 'app.lowcoder.cloud';
    const isLocalhost = window.location.hostname === 'localhost';

    /* if (isLocalhost || isLowCoderDomain) {
      posthog.init('phc_lD36OXeppUehLgI33YFhioTpXqThZ5QqR8IWeKvXP7f', { api_host: 'https://eu.i.posthog.com', person_profiles: 'always' });
    } */

    // persisting the language in local storage
    localStorage.setItem('lowcoder_uiLanguage', "en_US");

    return (
      <Wrapper language="en_US">
        <Helmet>
          {<title>Lowcoder</title>}
          {<link rel="icon" href="" />}
          <meta name="description" content={trans('productDesc')} />
          <meta
            name="keywords"
            content="Lowcoder, Applications, App Builder, Internal Applications, Websites, Dashboards, Data Visualization, Customer Applications, CRM, ERP, eCommerce, VideoMeeting, Rapid Development"
          />
          <meta name="author" content="Lowcoder Software LTD" />
          <meta name="robots" content="index, follow" />

          <meta
            key="og:title"
            property="og:title"
            content="Lowcoder"
          />
          <meta
            key="og:description"
            property="og:description"
            content={trans('productDesc')}
          />
          <meta
            key="og:image"
            property="og:image"
            content="https://raw.githubusercontent.com/lowcoder-org/lowcoder-media-assets/main/images/App%20Editor%20%7C%20Main%20Screeen%20clean%20v2.4.0.png"
          />
          <meta key="og:url" property="og:url" content={window.location.href} />
          <meta key="og:type" property="og:type" content="website" />

          <meta
            key="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            key="twitter:title"
            name="twitter:title"
            content="Lowcoder"
          />
          <meta
            key="twitter:description"
            name="twitter:description"
            content={trans('productDesc')}
          />
          <meta
            key="twitter:image"
            name="twitter:image"
            content="https://raw.githubusercontent.com/lowcoder-org/lowcoder-media-assets/main/images/App%20Editor%20%7C%20Main%20Screeen%20clean%20v2.4.0.png"
          />

          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            key="mobile-web-app-capable"
            name="mobile-web-app-capable"
            content="yes"
          />
          <meta key="theme-color" name="theme-color" content="#b480de" />

          <meta
            key="apple-mobile-web-app-capable"
            name="apple-mobile-web-app-capable"
            content="yes"
          />
          <meta
            key="apple-mobile-web-app-status-bar-style"
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta
            key="apple-mobile-web-app-title"
            name="apple-mobile-web-app-title"
            content="Lowcoder"
          />
          <link
            key="apple-touch-icon"
            rel="apple-touch-icon"
            href="https://raw.githubusercontent.com/lowcoder-org/lowcoder-media-assets/main/images/Lowcoder%20Logo%20512.png"
          />
          <link
            key="apple-touch-startup-image"
            rel="apple-touch-startup-image"
            href="https://raw.githubusercontent.com/lowcoder-org/lowcoder-media-assets/main/images/Lowcoder%20Logo%20512.png"
          />

          <meta
            key="application-name"
            name="application-name"
            content="Lowcoder"
          />
          <meta
            key="msapplication-TileColor"
            name="msapplication-TileColor"
            content="#b480de"
          />
          <meta
            key="msapplication-TileImage"
            name="msapplication-TileImage"
            content="https://raw.githubusercontent.com/lowcoder-org/lowcoder-media-assets/main/images/Lowcoder%20Logo%20150.png"
          />
          {/* }<meta key="msapplication-config" name="msapplication-config" content="https://www.yourdomain.com/path/to/browserconfig.xml" />, */}

          <link rel="canonical" href={window.location.href} />
          {isLowCoderDomain || isLocalhost && [
            // Adding Support for iframely to be able to embedd the component explorer in the docu
            <meta
              key="iframely:title"
              property="iframely:title"
              content="Lowcoder"
            />,
            <meta
              key="iframely:description"
              property="iframely:description"
              content={trans('productDesc')}
            />,
            <link
              key="iframely"
              rel="iframely"
              type="text/html"
              href={window.location.href}
              media="(aspect-ratio: 1280/720)"
            />,

            <link
              key="preconnect-googleapis"
              rel="preconnect"
              href="https://fonts.googleapis.com"
            />,
            <link
              key="preconnect-gstatic"
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />,
            <link
              key="font-ubuntu"
              href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,700;1,400&display=swap"
              rel="stylesheet"
            />,
            // adding Clearbit Support for Analytics
            <script
              key="clearbit-script"
              src="https://tag.clearbitscripts.com/v1/pk_dfbc0aeefb28dc63475b67134facf127/tags.js"
              referrerPolicy="strict-origin-when-cross-origin"
              type="text/javascript"
            ></script>,
          ]}
        </Helmet>
        <Router history={history}>
          <Switch>
            <LazyRoute
              fallback="layout"
              path={APP_EDITOR_URL}
              component={LazyAppEditor}
            />
            <LazyRoute
              path={INVITE_LANDING_URL}
              component={LazyInviteLanding}
            />
            <LazyRoute
              path={`/playground/:name/:dsl`}
              component={LazyComponentPlayground}
            />
            {developEnv() && (
              <>
                <LazyRoute
                  path="/debug_comp/:name"
                  component={LazyDebugComp}
                />
                <LazyRoute
                  exact
                  path="/debug_comp"
                  component={LazyDebugComp}
                />
                <LazyRoute path="/debug_editor" component={LazyAppEditor} />
                <LazyRoute path="/debug_new" component={LazyDebugNewComp} />
              </>
            )}
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  orgDev: state.ui.users.user.orgDev,
  currentUserId: state.ui.users.currentUser.id,
  currentUserAnonymous: state.ui.users.currentUser.name === "ANONYMOUS",
  currentOrgId: state.ui.users.user.currentOrgId,
  defaultHomePage: state.ui.application.homeOrg?.commonSettings.defaultHomePage,
  fetchHomeDataFinished: Boolean(state.ui.application.homeOrg?.commonSettings),
  uiLanguage: state.ui.users.user.uiLanguage,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCurrentUser: () => {
    dispatch(fetchUserAction());
  },
});

const AppIndexWithProps = connect(mapStateToProps, mapDispatchToProps)(AppIndex);

export function bootstrap() {
  initApp();
  loadComps();

  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <Provider store={reduxStore}>
      <AppIndexWithProps />
    </Provider>
  );
}

