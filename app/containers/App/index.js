/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import Food from "containers/Food/Loadable";
import Chef from "containers/Chef/Loadable";
import Book from "containers/Book/Loadable";
import Channel from "containers/Channel/Loadable";
import Crud from "containers/Crud/Loadable";
import Order from "containers/Order/Loadable";
import Read from "containers/Read/Loadable";
import Pencil from "containers/Pencil/Loadable";
import Genapp from "containers/Genapp/Loadable";
import Test from "containers/Test/Loadable";
import Search from "containers/Search/Loadable";
import Auth from "containers/Auth/Loadable";
import Dashboard from "containers/Dashboard/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Header from "components/Header";
import Footer from "components/Footer";

import GlobalStyle from "../../global-styles";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>{" "}
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />{" "}
        <Route path="/features" component={FeaturePage} />{" "}
        <Route path="/food" component={Food} />{" "}
        <Route path="/chef" component={Chef} />{" "}
        <Route path="/book" component={Book} />{" "}
        <Route path="/channel" component={Channel} />{" "}
        <Route path="/genapp" component={Genapp} />{" "}
        <Route path="/read" component={Read} />{" "}
        <Route path="/pencil" component={Pencil} />{" "}
        <Route path="/order" component={Order} />{" "}
        <Route path="/crud" component={Crud} />{" "}
        <Route path="/test" component={Test} />{" "}
        <Route path="/search" component={Search} />{" "}
        <Route path="/auth" component={Auth} />{" "}
        <Route path="/dashboard" component={Dashboard} />{" "}
        <Route path="" component={NotFoundPage} />{" "}
      </Switch>{" "}
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
