import * as React from "react";
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction
} from "@material-ui/core";

import DirectorySelectButton from "renderer/components/atoms/DirectorySelectButton";

type Props = {
	label: string;
	path: string;
	setPath: (path: string) => void;
};

const DirectorySelectItem: React.FunctionComponent<Props> = (props: Props) => {
	const { label, path, setPath } = props;

	const onClick = (p?: string): void => {
		if (p) {
			setPath(p);
		}
	};

	return (
		<ListItem>
			<ListItemText
				primary={label}
				secondary={path}
				secondaryTypographyProps={{ noWrap: true }}
			/>
			<ListItemSecondaryAction>
				<DirectorySelectButton onClick={onClick}>
					Browse
				</DirectorySelectButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default DirectorySelectItem;
