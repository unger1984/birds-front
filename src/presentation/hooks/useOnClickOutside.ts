import React, { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOnClickOutside = (ref: React.RefObject<any>, handler: (event?: MouseEvent | TouchEvent) => void): void => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			// Do nothing if clicking ref's element or descendent elements
			if (ref.current && !ref.current.contains(event.target)) {
				handler(event);
			}
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return (): void => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
};

export default useOnClickOutside;
