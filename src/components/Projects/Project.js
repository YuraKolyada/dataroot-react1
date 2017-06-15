import React from 'react';
import Link from '../Link/Link';
import s from "./Projects.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function Project({ data }){
	let {img, alt, tags} = data;	
	tags = tags.map((tag) => `#${tag} `);
	let tagsName = tags.join('');
	return (
	<div className={s.project}>
		<Link to='/catalog'>
			<img src={img} alt={alt} className={s.image} />
		</Link>
		<Link to='/catalog' className={s.name}> {tagsName} </Link>
	</div>

	)
}

export default withStyles(s)(Project);