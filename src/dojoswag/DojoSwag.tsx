import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './DojoSwag.m.css';

const factory = create();

export default factory(function DojoShirt() {
	return (
		<main class={css.root}>
			<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfkpw5q6CkrqpM4ykoNbfP2C8gIIgLC3Xr75dgRYgMqXx5mmA/formResponse">
				<h1>Dojo T-Shirt Request</h1>
				<p>Please fill out the information below to request a free Dojo t-shirt!</p>

				<label class={css.label}>
					<div>
						E-mail Address <span class={css.required}>*</span>
					</div>
					<input class={css.input} type="email" name="emailAddress" autocomplete="email" required />
				</label>

				<label class={css.label}>
					<div>
						Name <span class={css.required}>*</span>
					</div>
					<input class={css.input} type="text" name="entry.1521394193" autocomplete="name" required />
				</label>

				<label class={css.label}>
					<div>
						Mailing Address <span class={css.required}>*</span>
					</div>
					<textarea
						class={css.input}
						name="entry.273865199"
						autocomplete="street-address"
						rows="3"
						required
					/>
				</label>

				<label class={css.label}>
					<div>Pull Request or Issue</div>
					<input class={css.input} type="text" name="entry.1269168678" autocomplete="off" />
				</label>

				<div class={css.label}>
					<div>
						Shirt Size - All sizes are unisex <span class={css.required}>*</span>
					</div>
					<label class={css.radioLabel}>
						<input type="radio" name="entry.1092769988" value="S" /> S
					</label>
					<label class={css.radioLabel}>
						<input type="radio" name="entry.1092769988" value="M" /> M
					</label>
					<label class={css.radioLabel}>
						<input type="radio" name="entry.1092769988" value="L" /> L
					</label>
					<label class={css.radioLabel}>
						<input type="radio" name="entry.1092769988" value="XL" /> XL
					</label>
					<label class={css.radioLabel}>
						<input type="radio" name="entry.1092769988" value="XXL" /> XXL
					</label>
				</div>

				<label class={css.label}>
					<div>Company Name</div>
					<input class={css.input} type="text" name="entry.647744034" autocomplete="off" />
				</label>

				<label class={css.label}>
					<div>Job Title</div>
					<input class={css.input} type="text" name="entry.328280339" autocomplete="off" />
				</label>

				<button class={css.button} type="submit">
					Submit
				</button>
			</form>
		</main>
	);
});
