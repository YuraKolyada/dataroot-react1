import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../DescriptionProduct.scss';

function ListSelectPhotos({ list }){
	return (
		<div className={s.photos}>
            <img className={s.imageFirst} src={list[0]} alt="material" />
            <div className={s.photoOther}>
            	{ list.map((photo, index) => {
                	return ( 
                		index >= 1  ? 
                		<img className={s.imageOther} key={index} src={photo} alt="material" />
                        : 
                        null 
                    )
                })}
            </div>
        </div>
	);
} 


export default withStyles(s)(ListSelectPhotos);