import React from 'react';
import history from '../../history';
import Link from '../Link/Link';

export default class Products extends React.Component {
  
  render(){
    let { styles, selected, query, dataElem } = this.props;
    const { key, type, name} = dataElem;
    return (
        <Link to={'?type=' + type}  
        className={ type === query || (!query && key === 1 ) ? styles + " " + selected : styles} 
        key={key} >
        {name}</Link>
      )
  }
}
