import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import Card from '../card/Card';

import * as css from './DojoSwag.m.css';

const factory = create({ theme });

export default factory(function DojoShirt({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<main class={themedCss.root}>
			<Card classes={{ 'dojo.io/Card': { root: [themedCss.card] } }}>
				<form
					action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfkpw5q6CkrqpM4ykoNbfP2C8gIIgLC3Xr75dgRYgMqXx5mmA/formResponse"
					target="_blank"
				>
					<h1>Dojo T-Shirt Request</h1>
					<p>Please fill out the information below to request a free Dojo t-shirt!</p>

					<label class={themedCss.label}>
						<div>
							Name <span class={themedCss.required}>*</span>
						</div>
						<input
							class={themedCss.input}
							type="text"
							name="entry.1521394193"
							autocomplete="name"
							required
						/>
					</label>

					<label class={themedCss.label}>
						<div>
							Mailing Address <span class={themedCss.required}>*</span>
						</div>
						<textarea
							class={themedCss.input}
							name="entry.273865199"
							autocomplete="street-address"
							rows="3"
							required
						/>
					</label>

					<label class={themedCss.label}>
						<div>
							E-mail Address <span class={themedCss.required}>*</span>
						</div>
						<input
							class={themedCss.input}
							type="email"
							name="entry.371860426"
							autocomplete="email"
							required
						/>
					</label>

					<label class={themedCss.label}>
						<div>Pull Request or Issue</div>
						<input class={themedCss.input} type="text" name="entry.1269168678" autocomplete="off" />
					</label>

					<div class={themedCss.label}>
						<div>
							Shirt Size - All sizes are unisex <span class={themedCss.required}>*</span>
						</div>

						<label class={themedCss.radioLabel}>
							<input type="radio" name="entry.1092769988" value="S" required /> S
						</label>
						<label class={themedCss.radioLabel}>
							<input type="radio" name="entry.1092769988" value="M" required /> M
						</label>
						<label class={themedCss.radioLabel}>
							<input type="radio" name="entry.1092769988" value="L" required /> L
						</label>
						<label class={themedCss.radioLabel}>
							<input type="radio" name="entry.1092769988" value="XL" required /> XL
						</label>
						<label class={themedCss.radioLabel}>
							<input type="radio" name="entry.1092769988" value="XXL" required /> XXL
						</label>
					</div>

					<label class={themedCss.label}>
						<div>Company Name</div>
						<input class={themedCss.input} type="text" name="entry.647744034" autocomplete="off" />
					</label>

					<label class={themedCss.label}>
						<div>Job Title</div>
						<input class={themedCss.input} type="text" name="entry.328280339" autocomplete="off" />
					</label>

					<button class={themedCss.button} type="submit">
						Submit
					</button>
				</form>
			</Card>
		</main>
	);
});
