/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import newsQuery from './news.graphql';
import s from './Home.css';
import Products from '../../components/catalogProduct/products';
import Feedback from '../../components/Feedback/Feedback';
import Header from '../../components/Header/Header';
import Projects from '../../components/Projects/Projects';
import Information from '../../components/Information/Information';
import AboutUs from '../../components/AboutUs';
class Home extends React.Component {
  render() {
    return (
      <div>
          <Header activeBanner={false} />
          <Information />
          <Products />
          <AboutUs />
          <Projects />
          <Feedback />
      </div>
    );
  }
}

export default withStyles(s)(Home);
