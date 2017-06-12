import React from 'react';
import Link from '../Link/Link';
import s from "./Projects.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function Project(props){
	const {name, photo, link, alt} = props.data;	
	return (
	<div className={s.project}>
		<Link to={link}>
			<img src={photo} alt={alt} className={s.image} />
		</Link>
		<Link to={link} className={s.name}>{name}</Link>
	</div>

	)
}

export default withStyles(s)(Project);