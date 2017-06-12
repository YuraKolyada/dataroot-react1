import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import LanguageSwitcher from '../LanguageSwitcher';
import Svg from 'svg-react';
import MenuIsActive from './Menu/MenuIsActive';
import MenuIsNotActive from './Menu/MenuIsNotActive';

const logo = 'http://savepic.ru/14399600.png';

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
          { (this.state.isActiveMenu) 
            ? 
            <MenuIsNotActive onBtnShowMenu={this.onBtnShowMenu.bind(this)} />
            : 
            <MenuIsActive onBtnCloseMenu={this.onBtnShowMenu.bind(this)} />
          }
        </div>

        { !this.props.activeBanner 
          ? 
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
                <a className={s.phone} href="tel:+380664455900">+38 066 445 59 00</a>
                <p className={s.address}>Доставка по Україні</p>
              </div>
              <Link to="/catalog" className={s.btn}>Зв'язатись з нами</Link>
              <div className={s.langSwitch}>
                <span className={s.active}>УКР &#8260; </span>
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
