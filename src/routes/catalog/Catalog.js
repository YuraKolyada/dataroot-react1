

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Catalog.scss';
import Feedback from '../../components/Feedback/Feedback';
import Header from '../../components/Header/Header';
import AboutUs from '../../components/AboutUs';
import DescriptionProduct from '../../components/DescriptionProduct/DescriptionProduct';

class Contact extends React.Component {
    render() {
        return (
        <div>
   			<Header activeBanner={true} />
            <DescriptionProduct context={this.props.context} />
            <AboutUs />
            <Feedback />
        </div>
      );
    }
}


export default withStyles(s)(Contact);
