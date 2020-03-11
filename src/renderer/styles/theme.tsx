import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#534bae",
			main: "#1a237e",
			dark: "#000051",
			contrastText: "#ffffff"
		},
		secondary: {
			light: "#ffdd71",
			main: "#ffab40",
			dark: "#c77c02",
			contrastText: "#000000"
		}
	}
});

export default theme;
