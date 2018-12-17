import { registerHandlers, processMarkdown, handlers } from './compile';

export default function(filePath: string) {
	const registeredHandlers = registerHandlers(handlers);

	return processMarkdown(filePath, registeredHandlers);
}
