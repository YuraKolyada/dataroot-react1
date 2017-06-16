
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DescriptionProduct.scss';
import { connect } from "react-redux"; 
import { bindActionCreators } from 'redux';
import {selectMaterial} from '../../actions/materialsActions';
import Material from './Material';
import ListSelectPhotos from './ListSelectPhotos/ListSelectPhotos';
import history from '../../history';



class DescriptionProducts extends React.Component {
  constructor(){
    super();
  }

  static propTypes = {
    listMaterials: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.number,
      name: React.PropTypes.string,
      type: React.PropTypes.string,
    })),

    error: React.PropTypes.bool,

    parkData: React.PropTypes.arrayOf(React.PropTypes.shape({
      img: React.PropTypes.string,
      alt: React.PropTypes.string,
    })),

    architectureData: React.PropTypes.arrayOf(React.PropTypes.shape({
      img: React.PropTypes.string,
      alt: React.PropTypes.string,
    })),

    selectbtn: React.PropTypes.func,

    selectedMaterial:React.PropTypes.arrayOf(React.PropTypes.shape({
      img: React.PropTypes.string,
      alt: React.PropTypes.string,
    })),

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
