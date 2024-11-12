import React, { useRef, useState } from 'react';

import './input-select.scss';
import useOnClickOutside from 'presentation/hooks/useOnClickOutside';

export interface InputSelectProps {
	placeholder?: string;
	value?: any;
	children: any[];
	onChange?: (value: any) => void;
	withNull?: string;
	stringify?: (value: any) => string | null;
	error?: string | null;
}

export const InputSelect: React.FC<InputSelectProps> = ({
	placeholder,
	value,
	children,
	onChange,
	withNull,
	stringify = val => val,
	error,
}) => {
	const mref = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState<boolean>(false);

	useOnClickOutside(mref, () => {
		setActive(false);
	});

	const handleActive = (event: React.MouseEvent) => {
		event.stopPropagation();
		setActive(true);
	};

	const handleChange = (event: React.MouseEvent, val: any) => {
		event.stopPropagation();
		setActive(false);
		if (onChange) {
			onChange(val);
		}
	};

	return (
		<div
			ref={mref}
			className={`input-select inputcomponent js-input-select ${error ? 'error' : ''}`}
			onClick={handleActive}
			title={placeholder}
		>
			{stringify(value) && <span className="input-select__title">{placeholder ?? 'Выберите'}</span>}
			<div className={`select-selected ${active ? 'select-arrow-active' : ''}`}>
				{stringify(value) ?? placeholder}
			</div>
			{active && (
				<div className="select-items">
					{withNull && (
						<div onClick={event => handleChange(event, null)}>
							{withNull.length > 0 ? withNull : 'Не выбрано'}
						</div>
					)}
					{children.map((itm, index) => (
						<div key={index} onClick={event => handleChange(event, itm)}>
							{stringify(itm)}
						</div>
					))}
				</div>
			)}
			{error && <div className="error">{error}</div>}
		</div>
	);
};
