import React from 'react';

import preloader from './preloader.gif';

export const Preloader: React.FC = () => {
	return <img className="preloader" src={preloader} alt="Загрузка...." />;
};
