import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

const InstructionStyles = {
	borderLeft: '4px solid #32d296',
	paddingLeft: '0.5rem',
	fontWeight: 'bold'
};

export default class Instruction extends WidgetBase {
	render() {
		return <div styles={InstructionStyles}>{this.children}</div>;
	}
}
