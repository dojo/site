import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import * as css from './GetGoing.m.css';
import Card from '../../../widgets/card/Card';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';
import has from '@dojo/framework/has/has';

export default class GetGoing extends WidgetBase {
	protected render() {

        const { isIntersecting } = this.meta(Intersection).get('cli');

        const play = isIntersecting || has('build-time-render');

		return (
            <section classes={[css.root]}>
                <h2>Get Going Quickly</h2>
                <p classes={[css.headline]}>
                    Getting started with Dojo is simple. You can use your command line of choice and{' '}
                    <a href="https://www.npmjs.com">npm</a> to get going quickly.{' '}
                </p>
                <div key="cli" classes={[css.cli]}>
                    <Card dark={true} extraClasses={{ root: css.commands }}>
                        <div classes={[css.command]}>
                            <span classes={[css.commandOne, play ? css.commandOneAnimation : null]}>
                                npm i @dojo/cli @dojo/cli-create-app -g
                            </span>
                            <span classes={[play ? css.blinkOne : null]}>|</span>
                        </div>
                        <div classes={[css.command]}>
                            <span classes={[css.commandTwo, play ? css.commandTwoAnimation : null]}>
                                {' '}
                                dojo create app --name hello-world
                            </span>
                            <span classes={[play ? css.blinkTwo : null]}>|</span>
                        </div>
                    </Card>
                    <div classes={[css.codeContainer]}>
                        <Card dark={true} extraClasses={{ root: play ? css.code : css.hide }}>
                            <div classes={[css.codeline]}>
                                <span classes={[css.keyword]}>import</span>
                                <span classes={[css.variable]}>WidgetBase</span>
                                <span classes={[css.keyword]}>from</span>
                                <span classes={[css.string]}>'@dojo/framework/widget-core/WidgetBase'</span>
                                <span>;</span>
                            </div>
                            <div classes={[css.codeline]}>
                                <span classes={[css.keyword]}>import</span>
                                <span classes={[css.variable]}>ProjectorMixin</span>
                                <span classes={[css.keyword]}>from</span>
                                <span classes={[css.string]}>'@dojo/framework/widget-core/Projector'</span>
                                <span>;</span>
                            </div>
                            <div classes={[css.codeline]}>
                                <span classes={[css.keyword]}>import</span>
                                <span>{'{ '}</span>
                                <span classes={[css.variable]}>v</span>
                                <span>{'} '}</span>
                                <span classes={[css.keyword]}>from</span>
                                <span classes={[css.string]}>'@dojo/framework/widget-core/d'</span>
                                <span>;</span>
                            </div>
                        </Card>
                        <Card extraClasses={{
                            root: play ? css.result : css.hide,
                            content: css.resultContent 
                        }}>
                            <div classes={[css.check]}>✔</div>
                            <div>Success!</div>
                        </Card>
                    </div>
                </div>
            </section>
		);
	}
}
