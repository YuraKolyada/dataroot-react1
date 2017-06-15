
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DescriptionProduct.scss';
import { connect } from "react-redux"; 
import { bindActionCreators } from 'redux';
import {selectMaterial} from '../../actions/materialsActions';
import Material from './Material';
import ListSelectPhotos from './ListSelectPhotos/ListSelectPhotos';
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

  static propTypes = {
    listMaterials: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.number,
      name: React.PropTypes.string,
      type: React.PropTypes.string,
    }))
  }

  componentDidMount(){
    const type = this.props.context.query.type,
      startType = 'marble',
      startUrl = `?type=${startType}`;

    if(type){
      this.props.selectbtn(type);
    } else {
      history.push(startUrl);
      this.props.selectbtn(startType);
    }
  }

  componentWillReceiveProps(nextProps){
    let nextType = nextProps.context.query.type;
    if(nextType !== this.props.context.query.type){
      this.props.selectbtn(nextType)
    } else {
      return false;
    }
  }

  render(){
    let { selectedMaterial, listMaterials, selectbtn, context, error, parkData, architectureData } = this.props;
    console.log(parkData);
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
                  <Material dataElem={elem} 
                    styles={s.material}
                    key={index}
                    selected={s.select}
                    query={context.query.type}/>)}
              </div>
              { error ?
                <div className={s.error}>...loading</div>
                :
                <ListSelectPhotos list={selectedMaterial} />
              } 
            </div>
          </div>
          <div className={s.item}>
            <p className={s.name}>Складні архітектурні вироби</p>
            <div className={s.photo_wrap} >
             {architectureData.map((data, index) => 
                <img className={s.img}
                  key={index}
                  src={data.img}
                  alt={data.alt} 
                />
              )}
            </div>
          </div>
          <div className={s.item}>
            <p className={s.name}>Садово-паркове мистецтво</p>
            <div className={s.photo_wrap} >
              {parkData.map((data, index) => 
                <img className={s.img}
                  key={index}
                  src={data.img}
                  alt={data.alt} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapToStateProps(state){
  return {
    selectedMaterial: state.selectMaterial.selectedMaterial,
    listMaterials: state.selectMaterial.listMaterials,
    error: state.selectMaterial.error,
    parkData: state.PageCatalogData.park,
    architectureData: state.PageCatalogData.architecture
  }
}

function mapToActionProps(dispatch){
  return {
    selectbtn: bindActionCreators(selectMaterial,dispatch)
  }
}

export default withStyles(s)(connect(mapToStateProps, mapToActionProps)(DescriptionProducts));
