import { Constructor, MetaBase, WidgetMetaConstructor } from '@dojo/framework/core/interfaces';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import Map from '@dojo/framework/shim/Map';

type MetaFunction = <M extends MetaBase>(MetaType: WidgetMetaConstructor<M>, parentInvalidate: () => void) => any;

type MetaValue<M extends MetaBase, F extends jest.FunctionPropertyNames<M>> = Required<M>[F] extends (
	...args: any[]
) => any
	? (ReturnType<Required<M>[F]> | Partial<ReturnType<Required<M>[F]>>)
	: never;

export class MockMetaMixin<T extends Constructor<WidgetBase<any>>> {
	private mockMetaMixin = (Base: T, mockStub: MetaFunction): T => {
		return class extends Base {
			protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
				return mockStub(MetaType, () => this.invalidate());
			}

			/**
			 * Overriding render helps with testing metas that invalidate their host when their values change.
			 */
			protected render() {
				return super.render();
			}
		};
	};

	private mockMeta = <M extends MetaBase, F extends jest.FunctionPropertyNames<M>>(
		MetaType: WidgetMetaConstructor<M>,
		parentInvalidate: () => void
	): any => {
		if (!this.values[MetaType.name]) {
			throw new Error(`Meta '${MetaType.name}' not registered`);
		}

		const base = Object.getOwnPropertyNames(MetaType.prototype)
			.filter((key) => key !== 'constructor' && !key.startsWith('_'))
			.reduce(
				(current, method: string) => {
					current[method] = (...args: any) => {
						throw new Error(`Method '${method}' not registered for meta ${MetaType.name}`);
					};

					return current;
				},
				{} as {
					[key: string]: (...args: any) => any;
				}
			);

		return {
			...base,
			...Object.keys(this.values[MetaType.name]).reduce(
				(current, method: string) => {
					current[method] = (...args: jest.ArgsType<Required<M>[F]>) => {
						const argValues = this.getArgString(args);
						const argReturnValues = this.values[MetaType.name][method].get(argValues);
						if (!argReturnValues) {
							throw new Error(`Arguements ${argValues} not registered for ${MetaType.name}.${method}()`);
						}
						argReturnValues.count++;
						const { count, total, values, value } = argReturnValues;

						if (value) {
							return value;
						}

						if (values.length === 0) {
							throw new Error(
								`Arguements ${argValues} were registered ${total} time(s) for ${MetaType.name}.${method}() but have been called ${count} time(s)`
							);
						}
						const current = values.shift();

						if (values.length > 0) {
							if (typeof values[0] === 'object' && values[0].shouldInvalidate) {
								setTimeout(() => parentInvalidate());
							}
						}

						return typeof current === 'object' && current.value ? current.value : current;
					};
					return current;
				},
				{} as {
					[key: string]: (...args: jest.ArgsType<Required<M>[F]>) => any;
				}
			)
		};
	};

	private values: {
		[key: string]: {
			[method: string]: Map<
				string | Function,
				{
					count: number;
					total: number;
					values: any[];
					value: any;
				}
			>;
		};
	} = {};

	private Node: T;

	constructor(Node: T) {
		this.Node = Node;
	}

	public registerMetaCall<M extends MetaBase, F extends jest.FunctionPropertyNames<M>>(
		MetaType: WidgetMetaConstructor<M>,
		method: F,
		args: jest.ArgsType<Required<M>[F]>,
		value: MetaValue<M, F>
	) {
		if (!this.values[MetaType.name]) {
			this.values[MetaType.name] = {};
		}
		if (!this.values[MetaType.name][method]) {
			this.values[MetaType.name][method] = new Map();
		}
		const argValues = this.getArgString(args);
		this.values[MetaType.name][method].set(argValues, {
			count: 0,
			total: 1,
			values: [],
			value
		});
	}

	public registerMetaCallOnce<M extends MetaBase, F extends jest.FunctionPropertyNames<M>>(
		MetaType: WidgetMetaConstructor<M>,
		method: F,
		args: jest.ArgsType<Required<M>[F]>,
		...values: (
			| MetaValue<M, F>
			| {
					value: MetaValue<M, F>;
					shouldInvalidate: boolean;
			  })[]
	) {
		if (!this.values[MetaType.name]) {
			this.values[MetaType.name] = {};
		}
		if (!this.values[MetaType.name][method]) {
			this.values[MetaType.name][method] = new Map();
		}
		const argValues = this.getArgString(args);
		let argReturnValues = this.values[MetaType.name][method].get(argValues);
		if (!argReturnValues) {
			argReturnValues = {
				count: 0,
				total: 0,
				values: [],
				value: undefined
			};
			this.values[MetaType.name][method].set(argValues, argReturnValues);
		}

		argReturnValues.total += values.length;
		argReturnValues.values.push(...values);
	}

	private getArgString(args: any[]): string | Function {
		if (args.length === 1 && typeof args[0] === 'function') {
			return args[0];
		}
		return JSON.stringify(args);
	}

	public getClass() {
		return this.mockMetaMixin(this.Node, this.mockMeta);
	}
}
