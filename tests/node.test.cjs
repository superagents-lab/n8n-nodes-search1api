const assert = require('node:assert/strict');
const test = require('node:test');
const { NodeHelpers } = require('n8n-workflow');
const { Search1Api } = require('../dist/nodes/Search1Api/Search1Api.node.js');
const description = new Search1Api().description;

test('agentic search hides all manual search options, including stale workflow values', () => {
	const values = {
		resource: 'ask',
		operation: 'search',
		query: 'Bun this week',
		searchService: 'github',
		newsService: 'hackernews',
		maxResults: 25,
		page: 2,
		searchOptions: { timeRange: 'week', crawlResults: 3 },
	};
	const resolved = NodeHelpers.getNodeParameters(
		description.properties,
		values,
		true,
		false,
		{ typeVersion: 1 },
		description,
	);
	assert.deepEqual(resolved, { resource: 'ask', operation: 'search', query: 'Bun this week' });
	const visible = description.properties.filter((property) =>
		NodeHelpers.displayParameter(resolved, property, { typeVersion: 1 }, description),
	);
	assert.deepEqual(
		visible
			.filter((property) => property.routing?.send)
			.map((property) => property.routing.send.property),
		['query'],
	);
	const operation = visible
		.find((property) => property.name === 'operation')
		.options.find((option) => option.value === 'search');
	assert.deepEqual(operation.routing.request, { method: 'POST', url: '/ask', timeout: 45000 });
});

test('search source and time selectors match the current API, with native pagination', () => {
	const search = description.properties.find((property) => property.name === 'searchService');
	const engines = search.options.map((option) => option.value);
	assert.deepEqual(
		new Set(engines),
		new Set([
			'google',
			'bing',
			'bingcn',
			'duckduckgo',
			'yahoo',
			'yandex',
			'youtube',
			'x',
			'reddit',
			'github',
			'arxiv',
			'wechat',
			'bilibili',
			'imdb',
			'wikipedia',
			'grokipedia',
			'baidu',
			'360',
			'quark',
		]),
	);
	const options = description.properties.find(
		(property) => property.name === 'searchOptions',
	).options;
	const time = options.find((option) => option.name === 'timeRange');
	assert.ok(time.options.some((option) => option.value === 'week'));
	assert.equal(time.routing.send.property, 'time_range');
	const page = description.properties.find((property) => property.name === 'page');
	assert.equal(page.routing.send.property, 'page');
	assert.deepEqual(page.displayOptions.show.resource, ['webSearch']);
	assert.equal(description.usableAsTool, true);
});
