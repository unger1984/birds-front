import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';

import './header.scss';
import logo from './logo.png';
import { ServiceLocator } from 'factories/service.locator';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { Svg } from 'presentation/components/svg';

export const Header: React.FC = () => {
	// eslint-disable-next-line id-length
	const { t, i18n } = useTranslation();

	const handleChangeLang = () => {
		const lang = i18n.language === 'en' ? 'ru' : 'en';
		i18n.changeLanguage(lang).then(() => {
			moment.locale(lang);
			ServiceLocator.getInstance().settingsSource.lang = lang;
			ChatEffector.getInstance().reload();
		});
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
				<li className="header__nav--spacer">
					<a
						className="rustore"
						href="https://www.rustore.ru/catalog/app/pro.unger1984.birds"
						target="_blank"
						rel="noopener noreferrer"
					></a>
					<a className="apk" href="/birdsfeeder.apk" target="_blank" rel="noopener noreferrer"></a>
				</li>
				<li className="header__lang">
					<button className="btn" onClick={handleChangeLang}>
						{t('header.nav.lang')}
						<div>&nbsp;</div>
						<Svg name={i18n.language === 'en' ? 'ru' : 'en'} />
					</button>
				</li>
			</ul>
		</div>
	);
};
