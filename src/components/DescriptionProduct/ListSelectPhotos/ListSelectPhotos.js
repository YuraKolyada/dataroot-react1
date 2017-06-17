import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../DescriptionProduct.scss';

function ListSelectPhotos({ list }){
	return (
		list.length % 2 == 0 ?
            <div className={s.photos}>
                { list.map((photo, index) => 
                    <div style={{backgroundImage: `url(${photo.img})`}} className={s.imageAll} key={index} />
                )}
            </div>
            :
            <div className={s.photos}>
                <div className={s.imageFirst} style={{backgroundImage: `url(${list[0].img})`}} />
                <div className={s.photoOther}>
                    { list.map((photo, index) => (index >= 1)  
                        ? <div style={{backgroundImage: `url(${photo.img})`}} className={s.imageOther} key={index} />
                        : null
                    )}
                </div>
            </div>
	);
} 


export default withStyles(s)(ListSelectPhotos);