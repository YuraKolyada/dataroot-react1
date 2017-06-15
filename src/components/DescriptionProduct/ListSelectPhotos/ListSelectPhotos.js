import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../DescriptionProduct.scss';

function ListSelectPhotos({ list }){
	return (
		<div className={s.photos}>
            <div className={s.photoOther}>
            	{ list.map((photo, index) => {
                	return ( 
                		index >= 0  ? 
                		<img className={s.imageOther} key={index} src={photo.img} alt={photo.alt} />
                        : 
                        null 
                    )
                })}
            </div>
        </div>
	);
} 


export default withStyles(s)(ListSelectPhotos);