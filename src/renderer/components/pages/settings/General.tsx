import * as React from "react";
import { Divider, List } from "@material-ui/core";

import DirectorySelectItem from "renderer/components/organisms/settings/DirectorySelectItem";

import SettingContents from "renderer/components/organisms/settings/SettingContents";

type ComponentProps = {
	sharedDirectoryPath: string;
	setSharedDirectoryPath: (path: string) => void;
};

const Component: React.FunctionComponent<ComponentProps> = (
	props: ComponentProps
) => {
	const { sharedDirectoryPath, setSharedDirectoryPath } = props;

	return (
		<SettingContents title="General">
			<List>
				<DirectorySelectItem
					label="Shared directory"
					dialogOptions={{ properties: ["openDirectory"] }}
					path={sharedDirectoryPath}
					setPath={setSharedDirectoryPath}
				/>
				<Divider />
			</List>
		</SettingContents>
	);
};

type Props = {};

const General: React.FunctionComponent<Props> = (props: Props) => {
	const [sharedDirectoryPath, setSharedDirectoryPath] = React.useState(" ");

	return (
		<Component
			sharedDirectoryPath={sharedDirectoryPath}
			setSharedDirectoryPath={setSharedDirectoryPath}
		/>
	);
};

export default General;
