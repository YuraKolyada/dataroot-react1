import React from 'react';
import s from "./products.scss";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link/Link';
import product1 from '../../image/product1.png';
import product2 from '../../image/product2.png';
import product3 from '../../image/product3.png';
import product4 from '../../image/product4.png';

const navigation = {
	productsType: [
		{
			name: "Внутрішнє та зовнішнє оздоблення", 
			link: '/catalog',
			active: true
		}, 
		{
			name: "Складні архітектурні вироби",
			link: '/catalog',
			active: false
		},
		{
			name: "Садово-паркове мистецтво", 
			link: '/catalog',
			active: false
		}
	],
	
	type: [
		{
			name: "Портрети",
			photo: product1,
			link: '/catalog',
			alt: 'portrets'
		},
		{
			name: "Скульптури",
			photo: product2,
			link: '/catalog',
			alt: 'Скульптури'

		},
		{
			name: "Каміни",
			photo: product3,
			link: '/catalog',
			alt: 'Каміни'

		},
		{
			name: "Столешні",
			photo: product4,
			link: '/catalog',
			alt: 'Столешні'

		}
	]
}


class Products extends React.Component {
	constructor(){
		super();
	}

	render(){
		return (
			<div className={s.products}>
				<h2 className={s.title}>Каталог продукції</h2>
				<div className={s.items}>
					<div className={s.all}>
						<div>
							{navigation.productsType.map((elem, index) => 
								<Link key={index}
									className={elem.active ? `${s.item} ${s.select}` : s.item}
									to={elem.link}>
									{elem.name} 
								</Link>
							)}
						</div>
						<Link to="/catalog" className={s.btn}>Каталог продукції</Link>
					</div>

					{navigation.type.map((elem, index) => (
						<div key={index}>
							<div className={s.imageWrap}>
								<img className={s.image} src={elem.photo} alt={elem.alt}  />
							</div>
							<div className={s.wrap}>
								<Link to={elem.link} className={s.element}>{elem.name}</Link>
							</div>
						</div>)
					)}
				</div>
			</div>
			)
	}
}


export default withStyles(s)(Products);
