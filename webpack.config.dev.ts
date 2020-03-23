import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const common: webpack.Configuration = {
	mode: "development",
	devtool: "inline-source-map"
};

const dist = path.resolve(__dirname, "dist");
const src = path.resolve(__dirname, "src");
const main = path.resolve(src, "main");
const preload = path.resolve(src, "preload.ts");
const renderer = path.resolve(src, "renderer");
const client = path.resolve(src, "client");

const plugins = [
	new TsconfigPathsPlugin({
		configFile: "tsconfig.json"
	})
];

const mainConfig: webpack.Configuration = {
	...common,
	target: "electron-main",
	entry: path.resolve(main, "index.ts"),
	output: {
		path: dist,
		filename: "main.js"
	},
	resolve: {
		plugins,
		extensions: [".js", ".ts"]
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.ts$/,
				loader: "eslint-loader",
				include: main
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				include: main
			}
		]
	}
};

const preloadConfig: webpack.Configuration = {
	...common,
	target: "electron-preload",
	entry: preload,
	output: {
		path: dist,
		filename: "preload.js"
	},
	resolve: {
		plugins,
		extensions: [".js", ".ts"]
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.ts$/,
				loader: "eslint-loader",
				include: preload
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				include: preload
			}
		]
	}
};

const rendererConfig: webpack.Configuration = {
	...common,
	target: "electron-renderer",
	entry: path.resolve(renderer, "index.tsx"),
	output: {
		path: dist,
		filename: "renderer.js"
	},
	resolve: {
		plugins,
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.tsx?$/,
				loader: "eslint-loader",
				include: renderer
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				include: renderer
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(src, "index.html"),
			filename: path.resolve(dist, "renderer.html")
		})
	]
};

const clientConfig: webpack.Configuration = {
	...common,
	target: "web",
	entry: path.resolve(client, "index.tsx"),
	output: {
		path: dist,
		filename: "client.js"
	},
	resolve: {
		plugins,
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.tsx?$/,
				loader: "eslint-loader",
				include: client
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				include: client
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(src, "index.html"),
			filename: path.resolve(dist, "index.html")
		})
	],
	devServer: {
		host: "localhost",
		port: 8000,
		contentBase: dist,
		index: path.resolve(dist, "index.html"),
		hot: true
	}
};

export default [
	{ name: "main", ...mainConfig },
	{ name: "preload", ...preloadConfig },
	{ name: "renderer", ...rendererConfig },
	{ name: "client", ...clientConfig }
];
