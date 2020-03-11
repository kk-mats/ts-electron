import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const common: webpack.Configuration = {
	mode: "development"
};

const dist = path.resolve(__dirname, "dist");
const src = path.resolve(__dirname, "src");
const main = path.resolve(src, "main");
const preload = path.resolve(src, "preload.ts");
const renderer = path.resolve(src, "renderer");

const plugins = [
	new TsconfigPathsPlugin({
		configFile: "tsconfig.json"
	})
];

const mainConfig: webpack.Configuration = {
	...common,
	target: "electron-main",
	devtool: "inline-source-map",
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
	devtool: "inline-source-map",
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
	devtool: "inline-source-map",
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
			filename: path.resolve(dist, "index.html")
		})
	]
};

export default [
	{ name: "main", ...mainConfig },
	{ name: "preload", ...preloadConfig },
	{ name: "renderer", ...rendererConfig }
];
