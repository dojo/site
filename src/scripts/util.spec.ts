import { isElementNode, HastNode, isTextNode, isYamlNode } from './util';

const elementNode: HastNode = {
	type: 'element',
	tagName: 'p',
	properties: {},
	children: []
};

const textNode: HastNode = {
	type: 'text',
	value: 'Some text'
};

const yamlNode: HastNode = {
	type: 'yaml',
	value: 'something: Some value\nsomethingElse: false',
	data: {
		parsedValue: {
			something: 'Some value',
			somethingElse: false
		}
	}
};

describe('scripts util', () => {
	test('isElementNode', () => {
		expect(isElementNode(elementNode)).toBeTruthy();
		expect(isElementNode(textNode)).toBeFalsy();
		expect(isElementNode(yamlNode)).toBeFalsy();
	});

	test('isTextNode', () => {
		expect(isTextNode(elementNode)).toBeFalsy();
		expect(isTextNode(textNode)).toBeTruthy();
		expect(isTextNode(yamlNode)).toBeFalsy();
	});

	test('isYamlNode', () => {
		expect(isYamlNode(elementNode)).toBeFalsy();
		expect(isYamlNode(textNode)).toBeFalsy();
		expect(isYamlNode(yamlNode)).toBeTruthy();
	});
});
