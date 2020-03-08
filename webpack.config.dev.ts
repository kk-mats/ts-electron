import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const common: webpack.Configuration = {
	mode: "development"
};

const dist = path.resolve(__dirname, "dist");
const plugins = [
	new TsconfigPathsPlugin({
		configFile: "tsconfig.json"
	})
];

const main: webpack.Configuration = {
	...common,
	target: "electron-main",
	devtool: "inline-source-map",
	entry: path.resolve(__dirname, "src", "main", "index.ts"),
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
				include: path.resolve(__dirname, "src", "main")
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				include: path.resolve(__dirname, "src", "main")
			}
		]
	}
};

const renderer: webpack.Configuration = {
	...common,
	target: "electron-renderer",
	devtool: "inline-source-map",
	entry: path.resolve(__dirname, "src", "renderer", "index.tsx"),
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
				include: path.resolve(__dirname, "src", "renderer")
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				include: path.resolve(__dirname, "src", "renderer")
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			filename: path.resolve(dist, "index.html")
		})
	]
};

export default [main, renderer];
