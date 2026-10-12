import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Search1Api implements ICredentialType {
	name = 'search1Api';

	displayName = 'Search1API API';

	icon: Icon = {
		light: 'file:../nodes/Search1Api/search1api.svg',
		dark: 'file:../nodes/Search1Api/search1api.dark.svg',
	};

	documentationUrl = 'https://s1.dev/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.search1api.com',
			url: '/usage',
			method: 'GET',
			qs: {
				period: 'day',
			},
		},
	};
}
