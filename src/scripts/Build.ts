import { Destroyable } from '@dojo/framework/core/Destroyable';
import Map from '@dojo/framework/shim/Map';
import WeakMap from '@dojo/framework/shim/WeakMap';
import { WidgetMetaProperties, MetaBase } from '@dojo/framework/widget-core/interfaces';

export class Build extends Destroyable implements MetaBase {
    private _moduleMap = new WeakMap<Function, any>();
    private _invalidate: () => void;

    constructor(properties: WidgetMetaProperties) {
        super();
        this._invalidate = properties.invalidate;
    }

    public run<T extends Function>(module: T): T {
        const decoratedModule: any = (...args: any[]) => {
            let valueMap = this._moduleMap.get(module);
            if (!valueMap) {
                valueMap = new Map();
                this._moduleMap.set(module, valueMap);
            }
            const argsString = JSON.stringify(args);
            const value = valueMap.get(argsString);
            if (value !== undefined) {
                return value;
            }

            valueMap.set(argsString, null);
            const result = module(...args);
            if (typeof result.then === 'function') {
                result.then((result: any) => {
                    valueMap.set(argsString, result);
                    this._invalidate();
                });
                return null;
            } else {
                valueMap.set(argsString, result);                      
            } 
            return result;
        };
        return decoratedModule as T;
    }
}

export default Build;
