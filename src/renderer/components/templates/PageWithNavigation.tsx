import * as React from "react";
import { Grid } from "@material-ui/core";

type Props = {
	navigation: React.ReactNode;
	children: React.ReactNode;
};

const MainWithHeader: React.FunctionComponent<Props> = (props: Props) => {
	const { navigation, children } = props;

	return (
		<Grid container>
			<Grid item xs={3}>
				{navigation}
			</Grid>
			<Grid item xs={9}>
				{children}
			</Grid>
		</Grid>
	);
};

export default MainWithHeader;
