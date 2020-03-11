import * as React from "react";

import { Typography } from "@material-ui/core";

type Props = {
	title: string;
	children: React.ReactNode;
};

const SettingItemsWithTitle: React.FunctionComponent<Props> = (
	props: Props
) => {
	const { title, children } = props;

	return (
		<div>
			<Typography variant="h5" component="h2">
				{title}
			</Typography>
			{children}
		</div>
	);
};

export default SettingItemsWithTitle;
