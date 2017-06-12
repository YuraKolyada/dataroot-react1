import React from 'react';
import s from "./Projects.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link/Link';
import Project from './Project';
import project1 from '../../image/project1.png';
import project3 from '../../image/project2.png';
import project2 from '../../image/project3.png';



const ProjectsData = [
        {    
            name: "#onyx #m-selection",
            photo: project1,
            link: '/catalog',
            alt: 'projects'
        },
        {
            name: "#onyx #m-selection",
            photo: project1,
            link: '/catalog',
            alt: 'projects'

        },
        {
            name:'#onyx #m-selection',
            photo: project3,
            link: '/catalog',
            alt: 'projects',
        },
        {
            name: "#onyx #m-selection",
            photo: project1,
            link: '/catalog',
            alt: 'projects'

        },
        {
            name: "#onyx #m-selection",
            photo: project2,
            link: '/catalog',
            alt: 'projects'

        },
        {
            name: "#onyx #m-selection",
            photo: project1,
            link: '/catalog',
            alt: 'projects'

        }
];

class Projects extends React.Component {
    render() {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1 className={s.title}>Краще один раз подивитись</h1>
                    <p className={s.topic}>Фото проектів з нашого instagram.</p>
                    <div className={s.projects}>
                    
                        {ProjectsData.map((elem, index) => {
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


export default withStyles(s)(Projects);
