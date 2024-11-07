import React from 'react';
import moment from 'moment';

import './footer.scss';
import github from './github.png';
import twitter from './twitter.png';
import boosty from './boosty.png';
import { ServiceLocator } from 'factories/service.locator';

export const Footer: React.FC = () => {
	const version = ServiceLocator.getInstance().configSource.version;

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
			</div>
			<div>
				<a href="https://boosty.to/unger1984" target="_blank" rel="noreferrer">
					<img src={boosty} alt="boosty" />
				</a>
				<a href="https://twitter.com/unger1984" target="_blank" rel="noreferrer">
					<img src={twitter} alt="twitter" />
				</a>
				<a href="https://github.com/unger1984" target="_blank" rel="noreferrer">
					<img src={github} alt="github" />
				</a>
			</div>
		</footer>
	);
};
