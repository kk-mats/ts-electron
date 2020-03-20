import * as React from "react";
import { Button } from "@material-ui/core";

import * as Electron from "electron";

type Props = {
	options: Electron.OpenDialogOptions;
	onClick: (value: Electron.OpenDialogReturnValue) => void;
	children: React.ReactNode;
};

const ShowOpenDialogButton: React.FunctionComponent<Props> = (props: Props) => {
	const { options, onClick, children } = props;

	const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		(async (): Promise<void> => {
			onClick(await window.dialog.showOpenDialog(options));
		})();
	};

	return (
		<Button variant="outlined" onClick={onButtonClick}>
			{children}
		</Button>
	);
};

export default ShowOpenDialogButton;
