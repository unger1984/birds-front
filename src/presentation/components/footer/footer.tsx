import React from 'react';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

import './footer.scss';
import github from './github.png';
import twitter from './twitter.png';
import boosty from './boosty.png';
import github_white from './github_white.png';
import twitter_white from './twitter_white.png';
import boosty_white from './boosty_white.png';
import { ServiceLocator } from 'factories/service.locator';

export const Footer: React.FC = () => {
	const version = ServiceLocator.getInstance().configSource.version;
	const systemPrefersDark = useMediaQuery(
		{
			query: '(prefers-color-scheme: dark)',
		},
		undefined,
	);

	return (
		<footer className="footer">
			<div>
				<div className="footer__version">
					ver.{version.length > 0 ? moment(version).format('YYMMDDHHmm') : 'unknown'}
				</div>
				©2024{' '}
				<a className="footer__copy" href="https://unger1984.pro" target="_blank" rel="noreferrer">
					Andrey Unger
				</a>
				{/*</div>*/}
				{/*<div>*/}
				<a href="https://boosty.to/unger1984" target="_blank" rel="noreferrer">
					<img src={systemPrefersDark ? boosty_white : boosty} alt="boosty" />
				</a>
				<a href="https://twitter.com/unger1984" target="_blank" rel="noreferrer">
					<img src={systemPrefersDark ? twitter_white : twitter} alt="twitter" />
				</a>
				<a href="https://github.com/unger1984" target="_blank" rel="noreferrer">
					<img src={systemPrefersDark ? github_white : github} alt="github" />
				</a>
			</div>
		</footer>
	);
};
