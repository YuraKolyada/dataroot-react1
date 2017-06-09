/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import LanguageSwitcher from '../LanguageSwitcher';
import Svg from 'svg-react';
import logo from './logo.png';
import menu from './menu.png';
import close from './close.png';
import ListMenu from './ListMenu';

const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
      isActiveMenu: true
    }
  }

  onBtnShowMenu() {
    this.setState({
      isActiveMenu: !this.state.isActiveMenu,
    })
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.screen}>
          {(this.state.isActiveMenu) ? 
            ( <div className={s.notActiveMenu}>
                <Link to='/' className={s.title}>Майстерня</Link>
                <img src={menu} 
                alt="menu" 
                className={s.menu} 
                onClick={this.onBtnShowMenu.bind(this)} />
              </div>)
            :
            (<div className={s.about}>
              <div className={s.activeMenu}>
                <img src={close} 
                alt="close" 
                className={s.menu} 
                onClick={this.onBtnShowMenu.bind(this)} />
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
            </div>)
          }
        </div>

        { !this.props.active ? 
          (<div className={s.container}>
            <Link to={'/'} className={s.outer}>
                <img  className={s.logo} src={logo}/>
                <h1 className={s.mainTitle}>Майстерня</h1>
            </Link>
          </div>)
        :
          (<div className={s.wrap}>
            <Link to='/' className={s.title}>Майстерня</Link>
            <div className={s.contactsWrap}>
              <div className={s.contacts}>
                <p className={s.phone}>+38 066 445 59 00</p>
                <p className={s.address}>Доставка по Україні</p>
              </div>
              <Link to="/catalog" className={s.btn}>Зв'язатись з нами</Link>
              <div className={s.langSwitch}>
                <span className={s.active}>УКР / </span>
                <span>РУС</span>
              </div>
            </div>
          </div>)
        }
      </div>
    );
  }
}

export default withStyles(s)(Header);
