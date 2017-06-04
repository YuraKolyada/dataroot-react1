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
import s from './Footer.scss';
import Link from '../Link';
class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
            <div className={s.Map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.2681827114016!2d22.72451335009252!3d48.45138373424297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4739ab8a21d3ae17%3A0x6f5344e1208971a3!2z0LLRg9C70LjRhtGPINCf0LXRgNC10LzQvtCz0LgsINCc0YPQutCw0YfQtdCy0L4sINCX0LDQutCw0YDQv9Cw0YLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjA!5e0!3m2!1suk!2sua!4v1496568319085"
                className={s.frame}></iframe>
            </div>
            <div className={s.contact}>
                <div className={s.about}>
                    <div className={s.head}>

                        <div className={s.info}>
                            <h1 className={s.mainTitle}>Контакти</h1>
                            <Link to={'/'}> <p className={s.phoneNumber}>+38 066 445 59 00</p></Link>
                            <p className={s.address}>м. Мукачево, вул. Переяславська, 1</p>
                        </div>
                    </div>
                    <div className={s.nav}>
                        <NumberList numbers={numbers} />

                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li className={s.listItems} key={number.toString()}>
            <a className={s.text}>{number}</a>
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

export default withStyles(s)(Footer);
