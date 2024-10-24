import 'reflect-metadata';
import React from 'react';
import moment from 'moment';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import 'presentation/assets/svgSprite/svgInsert';
import 'presentation/scss/index.scss';
import { App } from 'presentation/app';
import { ServiceLocator } from 'factories/service.locator';

const googleAuthClientId = ServiceLocator.getInstance().configSource.googleAuthClientId;
const lang = ServiceLocator.getInstance().settingsSource.lang;

moment.locale(lang);

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			en: require('./presentation/lang/en.json'),
			ru: require('./presentation/lang/ru.json'),
		},
		lng: lang,
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
		},
	});

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
	<GoogleOAuthProvider clientId={googleAuthClientId}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>,
);
