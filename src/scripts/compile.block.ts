import { registerHandlers, processMarkdown, handlers } from './compile';

export default function(filePath: string) {
	const registeredHandlers = registerHandlers(handlers);

	const test = processMarkdown(filePath, registeredHandlers);
	return test;
}
