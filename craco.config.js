const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				postcssLoaderOptions: {
					ident: 'postcss',
					plugins: () => [require('tailwindcss'), require('autoprefixer')],
				},
				lessLoaderOptions: {
					lessOptions: {
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
