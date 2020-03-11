import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import theme from "renderer/styles/theme";

import Root from "renderer/components/pages/Root";

const Index: React.FunctionComponent = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Root />
			</BrowserRouter>
		</ThemeProvider>
	);
};

ReactDom.render(<Index />, document.getElementById("app"));
