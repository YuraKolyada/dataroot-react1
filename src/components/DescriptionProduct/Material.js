import React from 'react';
import history from '../../history';
import Link from '../Link/Link';

export default class Products extends React.Component {
  constructor(){
    super();
  }

  render(){
    let { styles, selected, query, dataElem } = this.props;
    const { key, type, name} = dataElem;
    return (
        <Link to={'?type=' + type}  
        className={type === query ? styles + " " + selected : styles} 
        key={key} >
        {name}</Link>
      )
  }
}
