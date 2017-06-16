import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../DescriptionProduct.scss';

function ListSelectPhotos({ list }){
	return (
		list.length % 2 == 0 ?
            <div className={s.photos}>
                { list.map((photo, index) => 
                    <img src={photo.img} className={s.imageAll} key={index} alt={photo.alt} />
                )}
            </div>
            :
            <div className={s.photos}>
                <div className={s.imageFirst}>
                    <img src={list[0].img} alt={list[0].alt} />
                </div>
                <div className={s.photoOther}>
                    { list.map((photo, index) => {
                        return ( 
                            index >= 1  ? 
                                <img src={photo.img} className={s.imageOther} key={index} alt={photo.alt} />
                            : 
                            null
                        )
                    })}
                </div>
            </div>
	);
} 


export default withStyles(s)(ListSelectPhotos);