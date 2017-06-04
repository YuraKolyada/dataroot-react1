import React from 'react';
import history from '../../history';

export default class Products extends React.Component {
  constructor(){
    super();
  }

  onClickBtn(key, e){
    this.props.selectbtn(key);
    history.push(`?type=${this.props.type}`);
  }

  componentDidMount(){
      history.push(`?type=${this.props.type}`);
  }

  render(){
    let { type, selectbtn, name, keys, styles, selected, classNameId} = this.props;
    return (
        <p 
        className={classNameId == keys ? styles + " " + selected : styles} 
        key={keys} 
        onClick={this.onClickBtn.bind(this,keys)}>
        {name}</p>
      )
  }
}
