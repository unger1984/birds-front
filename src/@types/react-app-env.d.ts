/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
declare module 'use-react-screenshot' {
	type UseScreenshot = (options?: {
		type: 'image/jpeg' | 'image/png';
		quality: number;
	}) => [string | null, (ref: HTMLDivElement) => void];
	declare const useScreenshot: UseScreenshot;
	declare const createFileName = (extension: string, name: string) => string;
	export { useScreenshot, createFileName };
}
