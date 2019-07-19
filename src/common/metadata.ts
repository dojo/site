const unified = require('unified');
const remarkParse = require('remark-parse');
const frontmatter = require('remark-frontmatter');
const parseFrontmatter = require('remark-parse-yaml');

type YamlData = { [key: string]: YamlData } | string | boolean | Date;

interface YamlNode {
	type: 'yaml';
	value: string;
	data: {
		parsedValue: { [key: string]: YamlData };
	};
}

function isYamlNode(child: any): child is YamlNode {
	return Boolean(child.type === 'yaml');
}

export const metadata = (content: string) => {
	const pipeline = unified()
		.use(remarkParse, { commonmark: true })
		.use(frontmatter, 'yaml')
		.use(parseFrontmatter);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	const node: YamlNode = result.children.find(isYamlNode);
	return node ? node.data.parsedValue : {};
};

export default metadata;
