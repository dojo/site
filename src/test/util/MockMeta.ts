import { Constructor, MetaBase, WidgetMetaConstructor } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Map from '@dojo/framework/shim/Map';

type MetaFunction = <M extends MetaBase>(MetaType: WidgetMetaConstructor<M>) => any;

export class MockMetaMixin<T extends Constructor<WidgetBase<any>>> {
	private mockMetaMixin = (Base: T, mockStub: MetaFunction): T => {
		return class extends Base {
			private handle: any;

			protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
				return mockStub(MetaType);
			}

			/**
			 * Overriding render helps with testing metas that invalidate their host when their values change.
			 */
			protected render() {
				this.handle && clearTimeout(this.handle);
				this.handle = setTimeout(() => this.invalidate());
				return super.render();
			}
		};
	};

	private mockMeta = <M extends MetaBase, F extends jest.FunctionPropertyNames<M>>(
		MetaType: WidgetMetaConstructor<M>
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
								`Arguements ${JSON.stringify(args)} were registered ${total} time(s) for ${
									MetaType.name
								}.${method}() but have been called ${count} time(s)`
							);
						}
						return values.shift();
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
		value: Required<M>[F] extends (...args: any[]) => any
			? (ReturnType<Required<M>[F]> | Partial<ReturnType<Required<M>[F]>>)
			: never
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
		...values: (Required<M>[F] extends (...args: any[]) => any
			? (ReturnType<Required<M>[F]> | Partial<ReturnType<Required<M>[F]>>)
			: never)[]
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
