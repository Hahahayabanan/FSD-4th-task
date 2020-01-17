Error.stackTraceLimit = Infinity;

const testContext = require.context('./../../src', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(testContext);
