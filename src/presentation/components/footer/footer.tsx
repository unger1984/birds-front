import React from 'react';

import './footer.scss';
import github from './github.png';
import twitter from './twitter.png';
import boosty from './boosty.png';

export const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div>
				©2024{' '}
				<a href="https://unger1984.pro" target="_blank" rel="noreferrer">
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
