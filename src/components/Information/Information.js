/**
 * Created by Vladyslav on 6/2/2017.
 */
import React from 'react';
import s from "./Information.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link/Link';

const logo = 'http://savepic.ru/14399600.png';

class Information extends React.Component {
    render() {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.leftBar}>
                        <div className={s.title}>
                            <p className={s.advert}>Створюємо шедeври з натурального каменю власноруч </p>
                        </div>
                        <div className={s.downBar}>
                            <div className={s.langSwitch}>

                            </div>
                            <Link to="/catalog" className={s.btn}>Зв'язатись з нами</Link>
                        </div>
                    </div>
                    <div className={s.about}>
                        <div className={s.head}>
                            <div className={s.logo}>
                                <Link to={'/'} className={s.outer}>
                                    <img className={s.logo} src={logo} alt="logo"/>
                                </Link>

                            </div>
                            <div className={s.info}>
                                <h1 className={s.mainTitle}>Майстерня</h1>
                                <a className={s.phoneNumber} href="tel:+380664455900">+38 066 445 59 00</a>
                                <p className={s.address}>м. Мукачево, вул. Переяславська, 1</p>
                            </div>
                        </div>
                        <div className={s.nav}>
                            <NumberList numbers={numbers} />

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
            <Link to='/catalog' className={s.text}>{number}</Link>
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = ['Каталог продукції', 'Про нас', 'Наші роботи'];

export default withStyles(s)(Information);
