const CracoLessPlugin = require('craco-less');

const UnstyledComponents = [
	'Schema',
	'DOMHelper',
	'Whisper',
	'SafeAnchor',
	'Portal',
	'IntlProvider',
	'Affix',
	'RangeSlider',
	'CustomProvider',
];

const getDefaultStyle = (name, _) => {
	const componentName = name.match(new RegExp(`rsuite/lib/(\\S*)`))[1];

	if (UnstyledComponents.indexOf(componentName) >= 0) {
		return false;
	} else return `rsuite/lib/${componentName}/styles/themes/dark`;
};

module.exports = {
	babel: {
		plugins: [
			[
				'import',
				{
					libraryName: 'rsuite',
					camel2DashComponentName: false,
					style: getDefaultStyle,
				},
			],
		],
	},
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
						modifyVars: {
							'@base-color': '#00bcd4',
							'@font-family-base': "'Raleway', Arial, Helvetica, sans-serif",
							'@ie-polyfill': 'false',
						},
					},
				},
			},
		},
	],
};
