import React from 'react';
import Link from '../../Link';
import s from '../Header.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const menu = 'http://savepic.ru/14387315.png';

function MenuIsNotActive(props) {
	let {onBtnShowMenu} = props;
	return (
		<div className={s.notActiveMenu}>
      <Link to='/' className={s.title}>Майстерня</Link>
      <img src={menu} 
      alt="menu" 
      className={s.menu} 
      onClick={onBtnShowMenu} />
    </div>
		)
} 


export default withStyles(s)(MenuIsNotActive);