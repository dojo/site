import * as mockery from 'mockery';
import * as sinon from 'sinon';

const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

const LOGGER_SCRIPT_PATH = '../logger';

describe('logger compiler', () => {
	let sandbox: sinon.SinonSandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		mockery.enable({ warnOnUnregistered: false, useCleanCache: true });
	});

	afterEach(() => {
		sandbox.restore();
		mockery.deregisterAll();
		mockery.resetCache();
		mockery.disable();
	});

	it('info writes to console', () => {
		const infoStub = sandbox.stub(console, 'info');

		const logger = require(LOGGER_SCRIPT_PATH);
		logger.info('Dummy message', 'something else', { test: 'test value' });

		assert.equal(infoStub.callCount, 1);
		assert.deepEqual(infoStub.firstCall.args, ['Dummy message', 'something else', { test: 'test value' }]);
	});
});
