export function formatTime12Hour(time24: string): string {
	// Expecting "HH:MM" or "HH:MM:SS"
	const [hourStr, minuteStr] = time24.split(":");

	let hour = Number(hourStr);
	const minute = Number(minuteStr);

	if (Number.isNaN(hour) || Number.isNaN(minute)) {
		return time24; // fallback if invalid
	}

	const period = hour >= 12 ? "PM" : "AM";

	hour = hour % 12;
	if (hour === 0) hour = 12;

	return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function formatDate(dateInput: Date | string, options?: Intl.DateTimeFormatOptions): string {
	const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

	if (isNaN(date.getTime())) return "";

	// Default options if none provided
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		...options,
	};

	return date.toLocaleDateString("en-US", defaultOptions);
}
