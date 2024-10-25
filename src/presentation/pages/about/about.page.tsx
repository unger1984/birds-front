import React from 'react';
import { useTranslation } from 'react-i18next';

import './about.scss';

export const AboutPage: React.FC = () => {
	// eslint-disable-next-line id-length
	const { t } = useTranslation();

	return (
		<div className="about">
			<h1>{t('about.title')}</h1>
			<div className="about__text">
				<div className="about__block">
					<p>{t('about.p1')}</p>
					<p>{t('about.p2')}</p>
					<p>{t('about.p3')}</p>
					<p>{t('about.p4')}</p>
					<p>{t('about.p5')}</p>
					<p>{t('about.p6')}</p>
					<p>{t('about.p7')}</p>
				</div>
				<div className="about__block">
					<p>{t('about.p8')}</p>
					<p>{t('about.p9')}</p>
					<p>{t('about.p10')}</p>
					<p>{t('about.p11')}</p>
					<a
						href="https://www.tbank.ru/cf/5mfwO0VNFF9"
						target="_blank"
						className="btn btn--primery"
						rel="noreferrer"
					>
						{t('chat.donate')}
					</a>
				</div>
			</div>
		</div>
	);
};
