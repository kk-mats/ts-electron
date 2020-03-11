import * as React from "react";
import { Button } from "@material-ui/core";

type Props = {
	onClick: (path?: string) => void;
	children: React.ReactNode;
};

const SharedDirectory: React.FunctionComponent<Props> = (props: Props) => {
	const { onClick, children } = props;

	const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = async event => {
		const paths = (
			await window.dialog.showOpenDialog({
				properties: ["openDirectory"]
			})
		).filePaths;

		if (paths) {
			onClick(paths[0]);
		}
	};

	return (
		<Button variant="outlined" onClick={onButtonClick}>
			{children}
		</Button>
	);
};

export default SharedDirectory;
