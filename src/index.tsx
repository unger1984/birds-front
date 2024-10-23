import 'reflect-metadata';
import React from 'react';
import moment from 'moment';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'presentation/assets/svgSprite/svgInsert';
import 'presentation/scss/index.scss';
import { App } from 'presentation/app';
import { ServiceLocator } from 'factories/service.locator';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const googleAuthClientId = ServiceLocator.getInstance().configSource.googleAuthClientId;

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
	<GoogleOAuthProvider clientId={googleAuthClientId}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>,
);
