/**
 * Created by Vladyslav on 6/2/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import s from "./AboutUs.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link/Link';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class AboutUs extends React.Component {

    static propTypes = {
        AboutData: React.PropTypes.shape({
          title: React.PropTypes.string,
          content: React.PropTypes.string,
          img: React.PropTypes.string,
        })
      }

    render() {
        let { title, content, img } = this.props.AboutData;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.image}>
                        <img className={s.aboutPic} src={img} alt="about"/>
                    </div>
                    <div className={s.topic}>
                        <h2 className={ this.props.bgPadding ? s.bgTitle : s.title}>{title}</h2>
                        <div className={s.text} dangerouslySetInnerHTML={{__html: content}}></div>
                        <div className={s.btn}>
                            <NumberList className={s.list} numbers={numbers} />
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

const numbers = ['Детальніше', 'Переглянути роботи'];

function mapStateToProps(state) {
    return {
        AboutData: state.PageHomeData.about
    }
}

export default withStyles(s)(connect(mapStateToProps)(AboutUs));

