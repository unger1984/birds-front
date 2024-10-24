import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './header.scss';
import logo from './logo.png';
import { ServiceLocator } from 'factories/service.locator';

export const Header: React.FC = () => {
	// eslint-disable-next-line id-length
	const { t, i18n } = useTranslation();

	const handleChangeLang = () => {
		const lang = i18n.language === 'en' ? 'ru' : 'en';
		i18n.changeLanguage(lang);
		ServiceLocator.getInstance().settingsSource.lang = lang;
	};

	return (
		<div className="header">
			<img className="header__logo" src={logo} alt="logo" />
			<ul className="header__nav">
				<li>
					<NavLink to="/" className={({ isActive }) => `header__nav--link ${isActive ? 'active' : ''}`}>
						{t('header.nav.home')}
					</NavLink>
				</li>
				<li>
					<NavLink to="/about" className={({ isActive }) => `header__nav--link ${isActive ? 'active' : ''}`}>
						{t('header.nav.about')}
					</NavLink>
				</li>
				<li className="header__nav--spacer"></li>
				<li>
					<button className="btn" onClick={handleChangeLang}>
						{t('header.nav.lang')}
						<span> </span>
						{t('header.nav.flag')}
					</button>
				</li>
			</ul>
		</div>
	);
};
