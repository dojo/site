import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import SectionLanding from '../widgets/section/SectionLanding';

export default class ReferenceGuidesLanding extends WidgetBase {
	protected render() {
		return <SectionLanding section="reference-guides" />;
	}
}
