import React from 'react';
import s from "./Projects.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link/Link';
import Project from './Project';
import { connect } from 'react-redux';


class Projects extends React.Component {
    render() {
        let { Projects } = this.props;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1 className={s.title}>Краще один раз подивитись</h1>
                    <p className={s.topic}>Фото проектів з нашого instagram.</p>
                    <div className={s.projects}>
                    
                        {Projects.map((elem, index) => {
                            return (
                                <Project key={index} 
                                data={elem} /> )})
                        }

                    </div>
                    <div className={s.btnWrap}>
                        <Link to='/catalog' className={s.btn}>Всі проекти </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Projects: state.PageHomeData.project
    }
}

export default withStyles(s)(connect(mapStateToProps)(Projects));
