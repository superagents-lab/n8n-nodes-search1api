# n8n-nodes-search1api

This is an [n8n](https://n8n.io/) community node. It lets you search and
retrieve live public web content with [Search1API](https://www.search1api.com)
in n8n workflows.

Search1API provides web and news search across general and vertical sources,
readable page retrieval, sitemap discovery, trending topics, and API usage
reporting.

## Installation

Follow the
[community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
and install:

```text
n8n-nodes-search1api
```

## Operations

- **Web Search: Search** — search the live web with Google, Bing, DuckDuckGo,
  Reddit, GitHub, YouTube, arXiv, Wikipedia, and other supported sources.
- **News Search: Search** — search current news from Bing, Google,
  DuckDuckGo, Yahoo, Hacker News, or Reuters.
- **Page: Retrieve** — retrieve readable content from a public URL.
- **Sitemap: Discover** — discover sitemap URLs or all public links on a site.
- **Trending Topic: Get Many** — get current GitHub or Hacker News trends.
- **Usage: Get** — inspect API-key usage over a selected period.

The Search1API node can be used as an n8n AI tool.

## Credentials

1. Create or sign in to a
   [Search1API account](https://www.search1api.com).
2. Create an API key in the Search1API dashboard.
3. In n8n, create a **Search1API API** credential and paste the key.
4. Test the credential. The test calls the read-only `/usage` endpoint and
   does not run a search.

Keep API keys in n8n credentials. Do not place them directly in workflow
fields or exported workflow JSON.

## Compatibility

- Node.js 22 or later is required to build the package.
- The package uses n8n Nodes API version 1 and the current community-node
  tooling.
- Version 0.1.0 is tested with the n8n development runtime bundled by
  `@n8n/node-cli` 0.41.x.

## Usage

For a focused lookup, use **Web Search** with five to ten results. For deeper
research, increase the result count and set **Crawl Results** to retrieve the
full text for the most relevant results.

Use a vertical source when the workflow has a clear target:

- **GitHub** for repositories and code projects
- **Reddit** for community discussions
- **ArXiv** for research papers
- **YouTube** for videos
- **WeChat** or **Bilibili** for Chinese-language content

Every operation is read-only. Search results include source URLs that can be
passed to later workflow steps.

## Resources

- [Search1API documentation](https://www.search1api.com/docs)
- [Search1API website](https://www.search1api.com)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Issues and support](https://github.com/superagents-lab/n8n-nodes-search1api/issues)

## Version history

### 0.1.0

Initial release with web search, news search, page retrieval, sitemap
discovery, trending topics, usage reporting, API-key credentials, and AI tool
support.

## License

[MIT](LICENSE.md)
