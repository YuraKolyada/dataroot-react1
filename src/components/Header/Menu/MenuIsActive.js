import React from 'react';
import close from '../close.png';
import logo from '../logo.png';
import Link from '../../Link';
import s from '../Header.scss';
import ListMenu from './ListMenu';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

function MenuIsActive(props) {
	let {onBtnCloseMenu} = props;
	return (
		<div className={s.about}>
          <div className={s.activeMenu}>
            <img src={close} 
            alt="close" 
            className={s.menu} 
            onClick={onBtnCloseMenu} />
          </div>
          <div className={s.head}>
              <div className={s.logo}>
                  <Link to={'/'} className={s.outer}>
                      <img className={s.logo} src={logo}/>
                  </Link>
              </div>
              <div className={s.info}>
                  <h1 className={s.mainTitle}>Майстерня</h1>
                  <Link to={'/'}> <p className={s.phoneNumber}>+38 066 445 59 00</p></Link>
                  <p className={s.address}>м. Мукачево, вул. Переяславська, 1</p>
              </div>
          </div>
          <div className={s.nav}>
              <ListMenu numbers={numbers} />
          </div>
          <div className={s.feedback}>
            <Link to="/catalog" className={`${s.btn} ${s.btnMenu}`}>Зв'язатись з нами</Link>
          </div>
        </div>


		)
} 

export default withStyles(s)(MenuIsActive);