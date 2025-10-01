import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	return new Date(dateString).toLocaleDateString('en-US', options);
}

export function parseActionResponse<T>(response: T) {
	return JSON.parse(JSON.stringify(response)) as T;
}
