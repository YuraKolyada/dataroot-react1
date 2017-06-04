
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DescriptionProduct.scss';
import { connect } from "react-redux"; 
import { bindActionCreators } from 'redux';
import {selectMaterial} from '../../actions/materialsActions';
import Material from './Material';
import productDesc from "../../image/productDesc.png";
import photo1 from "../../image/photo1.png";
import photo2 from "../../image/photo2.png";
import photo3 from "../../image/photo3.png";
import history from '../../history';


const list = [
  {
    name:'Складні архітектурні вироби',
    image: [
    {
      photo: photo1,
      alt: 'photo1',
    },
    {
      photo: photo2,
      alt: 'photo2'
    },
    {
      photo: photo3,
      alt: 'photo3'
    }]
  },
  {
    name:'Садово-паркове мистецтво',
    image: [
    {
      photo: productDesc,
      alt: 'photo1',
    }],
  }

];

class DescriptionProducts extends React.Component {
  constructor(){
    super();
  }

  render(){
    let {selectedMaterial, listMaterials, selectbtn } = this.props;
    return (
      <div className={s.products}>
        <h2 className={s.title}>Каталог продукції</h2>
        <div className={s.items}>
          <div className={s.item}>
            <p className={s.name}>Внутрішнє та зовнішнє оздоблення</p>
           <div className={s.item_wrap}>
             <div className={s.materials}>
              <span className={s.parametr}>Вид каменю:</span>
              {listMaterials.map((elem, index) => 
                <Material keys={elem.key} 
                styles={s.material}
                key={index}
                selected={s.select}
                type={selectedMaterial.type} 
                name={elem.name}
                classNameId={selectedMaterial.classNameId} 
                selectbtn={selectbtn} />)}
            </div>
              <div className={s.photos}>
                <img className={s.image} src={selectedMaterial.photos[0]} />
              
              </div>
            </div> 
           </div>
        </div>

        {list.map((elem, index) => {
          return (
            <div className={s.item} key={index}>
              <p className={s.name}>{elem.name}</p>
              <div className={s.photo_wrap} >
                {elem.image.map((elemPhoto, indexPhoto) => {
                  return (
                        <img className={s.image} 
                        src={elemPhoto.photo} 
                        alt={elemPhoto.alt} 
                        key={indexPhoto}/>
                    )
                })}
              </div>
            </div>)
        })}

      </div>
      )
  }
}

function mapToStateProps(state){
  return {
    selectedMaterial: state.selectMaterial.selectedMaterial,
    listMaterials: state.selectMaterial.listMaterials
  }
}

function mapToActionProps(dispatch){
  return {
    selectbtn: bindActionCreators(selectMaterial,dispatch)
  }
}

export default withStyles(s)(connect(mapToStateProps, mapToActionProps)(DescriptionProducts));
