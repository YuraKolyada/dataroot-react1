import React from 'react';
import history from '../../history';

export default class Products extends React.Component {
  constructor(){
    super();
  }

  onClickBtn(type){
    this.props.selectbtn(type);
    history.push(`?type=${this.props.dataElem.type}`);
  }

  render(){
    let { selectbtn, styles, selected, classNameId, dataElem, selectedType} = this.props;
    const { key, type, name} = dataElem;
    return (
        <p 
        className={classNameId == key ? styles + " " + selected : styles} 
        key={key} 
        onClick={this.onClickBtn.bind(this,type)}>
        {name}</p>
      )
  }
}
