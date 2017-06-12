import React from 'react';
import Link from '../../Link';
import s from '../Header.scss';
import ListMenu from './ListMenu';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'],
	close = 'http://savepic.ru/14398577.png',
	logo = 'http://savepic.ru/14399600.png'; 

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
                  <a className={s.phoneNumber} href="tel:+380664455900">+38 066 445 59 00</a>
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