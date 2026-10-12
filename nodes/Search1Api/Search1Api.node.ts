import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

const searchServiceOptions = [
	{ name: 'Google', value: 'google' },
	{ name: 'Bing', value: 'bing' },
	{ name: 'Bing China', value: 'bingcn' },
	{ name: 'DuckDuckGo', value: 'duckduckgo' },
	{ name: 'Yahoo', value: 'yahoo' },
	{ name: 'Yandex', value: 'yandex' },
	{ name: 'Reddit', value: 'reddit' },
	{ name: 'GitHub', value: 'github' },
	{ name: 'YouTube', value: 'youtube' },
	{ name: 'ArXiv', value: 'arxiv' },
	{ name: 'Wikipedia', value: 'wikipedia' },
	{ name: 'X', value: 'x' },
	{ name: 'WeChat', value: 'wechat' },
	{ name: 'Bilibili', value: 'bilibili' },
	{ name: 'IMDb', value: 'imdb' },
	{ name: 'Baidu', value: 'baidu' },
	{ name: 'Grokipedia', value: 'grokipedia' },
	{ name: '360 Search', value: '360' },
	{ name: 'Quark', value: 'quark' },
];

const newsServiceOptions = [
	{ name: 'Bing', value: 'bing' },
	{ name: 'Google', value: 'google' },
	{ name: 'DuckDuckGo', value: 'duckduckgo' },
	{ name: 'Yahoo', value: 'yahoo' },
	{ name: 'Hacker News', value: 'hackernews' },
	{ name: 'Reuters', value: 'reuters' },
];

const timeRangeOptions = [
	{ name: 'Any Time', value: '' },
	{ name: 'Past Day', value: 'day' },
	{ name: 'Past Week', value: 'week' },
	{ name: 'Past Month', value: 'month' },
	{ name: 'Past Year', value: 'year' },
];

export class Search1Api implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Search1API',
		name: 'search1Api',
		icon: {
			light: 'file:search1api.svg',
			dark: 'file:search1api.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Search and retrieve live public web content with Search1API',
		defaults: {
			name: 'Search1API',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'search1Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.search1api.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Agentic Search', value: 'ask' },
					{
						name: 'News Search',
						value: 'newsSearch',
					},
					{
						name: 'Page',
						value: 'page',
					},
					{
						name: 'Sitemap',
						value: 'sitemap',
					},
					{
						name: 'Trending Topic',
						value: 'trending',
					},
					{
						name: 'Usage',
						value: 'usage',
					},
					{
						name: 'Web Search',
						value: 'webSearch',
					},
				],
				default: 'webSearch',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['ask'] } },
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search with automatic routing',
						description: 'Choose engines and time window automatically (5 credits per call)',
						routing: { request: { method: 'POST', url: '/ask', timeout: 45000 } },
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webSearch'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search the web',
						description: 'Search the live public web',
						routing: {
							request: {
								method: 'POST',
								url: '/search',
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['newsSearch'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search current news',
						description: 'Search current news articles',
						routing: {
							request: {
								method: 'POST',
								url: '/news',
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['page'],
					},
				},
				options: [
					{
						name: 'Retrieve',
						value: 'retrieve',
						action: 'Retrieve a page',
						description: 'Retrieve readable content from a public URL',
						routing: {
							request: {
								method: 'POST',
								url: '/crawl',
							},
						},
					},
				],
				default: 'retrieve',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sitemap'],
					},
				},
				options: [
					{
						name: 'Discover',
						value: 'discover',
						action: 'Discover site links',
						description: 'Discover public links from a website',
						routing: {
							request: {
								method: 'POST',
								url: '/sitemap',
							},
						},
					},
				],
				default: 'discover',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['trending'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Get trending topics',
						description: 'Get trending topics from a supported source',
						routing: {
							request: {
								method: 'POST',
								url: '/trending',
							},
						},
					},
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['usage'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get API usage',
						description: 'Get usage statistics for the current API key',
						routing: {
							request: {
								method: 'GET',
								url: '/usage',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['webSearch', 'newsSearch', 'ask'],
					},
				},
				placeholder: 'e.g. latest AI agent frameworks',
				description:
					'Keywords for search or news, or a natural-language request for Agentic Search',
				routing: {
					send: {
						type: 'body',
						property: 'query',
					},
				},
			},
			{
				displayName: 'Search Service',
				name: 'searchService',
				type: 'options',
				options: searchServiceOptions,
				default: 'google',
				displayOptions: {
					show: {
						resource: ['webSearch'],
					},
				},
				description: 'The search source to use',
				routing: {
					send: {
						type: 'body',
						property: 'search_service',
					},
				},
			},
			{
				displayName: 'News Service',
				name: 'newsService',
				type: 'options',
				options: newsServiceOptions,
				default: 'bing',
				displayOptions: {
					show: {
						resource: ['newsSearch'],
					},
				},
				description: 'The news source to use',
				routing: {
					send: {
						type: 'body',
						property: 'search_service',
					},
				},
			},
			{
				displayName: 'Maximum Results',
				name: 'maxResults',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 50,
				},
				default: 10,
				displayOptions: {
					show: {
						resource: ['webSearch', 'newsSearch'],
					},
				},
				description: 'Maximum number of results to return',
				routing: {
					send: {
						type: 'body',
						property: 'max_results',
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1, maxValue: 100 },
				displayOptions: { show: { resource: ['webSearch'] } },
				description: 'Results page for engines with native pagination',
				routing: { send: { type: 'body', property: 'page' } },
			},
			{
				displayName: 'Options',
				name: 'searchOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['webSearch', 'newsSearch'],
					},
				},
				options: [
					{
						displayName: 'Crawl Results',
						name: 'crawlResults',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 50,
						},
						default: 0,
						description: 'Number of results to retrieve full content for',
						routing: {
							send: {
								type: 'body',
								property: 'crawl_results',
							},
						},
					},
					{
						displayName: 'Exclude Sites',
						name: 'excludeSites',
						type: 'string',
						default: '',
						placeholder: 'example.com, another.example',
						description: 'Comma-separated domains to exclude',
						routing: {
							send: {
								type: 'body',
								property: 'exclude_sites',
								value:
									'={{$value.split(",").map((site) => site.trim()).filter((site) => site.length > 0)}}',
							},
						},
					},
					{
						displayName: 'Include Images',
						name: 'image',
						type: 'boolean',
						default: false,
						description: 'Whether to include image results when supported',
						routing: {
							send: {
								type: 'body',
								property: 'image',
							},
						},
					},
					{
						displayName: 'Include Sites',
						name: 'includeSites',
						type: 'string',
						default: '',
						placeholder: 'example.com, another.example',
						description: 'Comma-separated domains to include',
						routing: {
							send: {
								type: 'body',
								property: 'include_sites',
								value:
									'={{$value.split(",").map((site) => site.trim()).filter((site) => site.length > 0)}}',
							},
						},
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: '',
						placeholder: 'e.g. en',
						description: 'Language hint for the search provider',
						routing: {
							send: {
								type: 'body',
								property: 'language',
							},
						},
					},
					{
						displayName: 'Time Range',
						name: 'timeRange',
						type: 'options',
						options: timeRangeOptions,
						default: '',
						description: 'Limit results by recency',
						routing: {
							send: {
								type: 'body',
								property: 'time_range',
							},
						},
					},
				],
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['page', 'sitemap'],
					},
				},
				placeholder: 'https://example.com',
				description: 'The public URL to retrieve or inspect',
				routing: {
					send: {
						type: 'body',
						property: 'url',
					},
				},
			},
			{
				displayName: 'Enable Fallback',
				name: 'enableFallback',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['page'],
					},
				},
				description: 'Whether to try an alternate retrieval path when the primary path fails',
				routing: {
					send: {
						type: 'body',
						property: 'enableFallback',
					},
				},
			},
			{
				displayName: 'Discovery Type',
				name: 'sitemapType',
				type: 'options',
				options: [
					{
						name: 'Sitemap Only',
						value: 'sitemap',
					},
					{
						name: 'All Discoverable Links',
						value: 'all',
					},
				],
				default: 'sitemap',
				displayOptions: {
					show: {
						resource: ['sitemap'],
					},
				},
				description: 'Whether to inspect sitemaps only or all discoverable site links',
				routing: {
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
			{
				displayName: 'Source',
				name: 'trendingSource',
				type: 'options',
				options: [
					{
						name: 'GitHub',
						value: 'github',
					},
					{
						name: 'Hacker News',
						value: 'hackernews',
					},
				],
				default: 'github',
				displayOptions: {
					show: {
						resource: ['trending'],
					},
				},
				description: 'The source of trending topics',
				routing: {
					send: {
						type: 'body',
						property: 'search_service',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'trendingLimit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 50,
				},
				default: 10,
				displayOptions: {
					show: {
						resource: ['trending'],
					},
				},
				description: 'Maximum number of trending topics to return',
				routing: {
					send: {
						type: 'body',
						property: 'max_results',
					},
				},
			},
			{
				displayName: 'Period',
				name: 'period',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Week',
						value: 'week',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
				default: 'month',
				displayOptions: {
					show: {
						resource: ['usage'],
					},
				},
				description: 'Usage aggregation period',
				routing: {
					send: {
						type: 'query',
						property: 'period',
					},
				},
			},
		],
	};
}
