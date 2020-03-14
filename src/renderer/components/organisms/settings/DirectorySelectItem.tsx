import * as React from "react";
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction
} from "@material-ui/core";

import * as Electron from "electron";

import ShowOpenDialogButton from "renderer/components/atoms/ShowOpenDialogButton";

type Props = {
	label: string;
	dialogOptions: Electron.OpenDialogSyncOptions;
	path: string;
	setPath: (path: string) => void;
};

const DirectorySelectItem: React.FunctionComponent<Props> = (props: Props) => {
	const { label, dialogOptions, path, setPath } = props;

	const onClick = (value: Electron.OpenDialogReturnValue): void => {
		if (value.filePaths[0]) {
			setPath(value.filePaths[0]);
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
				<ShowOpenDialogButton options={dialogOptions} onClick={onClick}>
					Browse
				</ShowOpenDialogButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default DirectorySelectItem;
