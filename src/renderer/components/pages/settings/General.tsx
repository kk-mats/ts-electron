import * as React from "react";
import { Divider, List } from "@material-ui/core";

import * as channels from "common/channels";
import * as configTypes from "common/types/config";

import * as Config from "renderer/contexts/Config";

import NumberField from "renderer/components/molecules/NumberField";
import DirectorySelectItem from "renderer/components/organisms/settings/DirectorySelectItem";
import SettingContents from "renderer/components/organisms/settings/SettingContents";

type ComponentProps = {
	newGeneralConfig: configTypes.General;
	generalConfig: configTypes.General;
	onApplyButtonClicked: React.MouseEventHandler<HTMLButtonElement>;
	setSharedDirectoryPath: (path: string) => void;
	setCacheDirectoryPath: (path: string) => void;
	setPort: (port: number) => void;
};

const Component: React.FunctionComponent<ComponentProps> = (
	props: ComponentProps
) => {
	const {
		newGeneralConfig,
		generalConfig,
		onApplyButtonClicked,
		setSharedDirectoryPath,
		setCacheDirectoryPath,
		setPort
	} = props;

	return (
		<SettingContents
			title="General"
			value={newGeneralConfig}
			oldValue={generalConfig}
			onApplyButtonClicked={onApplyButtonClicked}
		>
			<List>
				<DirectorySelectItem
					label="Shared directory"
					dialogOptions={{ properties: ["openDirectory"] }}
					path={newGeneralConfig.sharedDirectoryPath}
					setPath={setSharedDirectoryPath}
				/>
				<Divider />
				<DirectorySelectItem
					label="Cache directory"
					dialogOptions={{ properties: ["openDirectory"] }}
					path={newGeneralConfig.cacheDirectoryPath}
					setPath={setCacheDirectoryPath}
				/>
				<Divider />
				<NumberField
					label="Server port"
					value={newGeneralConfig.port}
					setValue={setPort}
				/>
			</List>
		</SettingContents>
	);
};

type Props = {
	generalConfig: configTypes.General;
	dispatch: React.Dispatch<Config.Action<"general">>;
};

const General: React.FunctionComponent<Props> = (props: Props) => {
	const { generalConfig, dispatch } = props;

	const [newGeneralConfig, setNewGeneralConfig] = React.useState(
		generalConfig
	);

	const onApplyButtonClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
		dispatch({
			type: channels.updateConfig,
			key: "general",
			value: newGeneralConfig
		});
	};

	const setSharedDirectoryPath = (path: string): void => {
		setNewGeneralConfig({
			...newGeneralConfig,
			sharedDirectoryPath: path
		});
	};

	const setCacheDirectoryPath = (path: string): void => {
		setNewGeneralConfig({
			...newGeneralConfig,
			cacheDirectoryPath: path
		});
	};

	const setPort = (port: number): void => {
		setNewGeneralConfig({
			...newGeneralConfig,
			port
		});
	};

	return (
		<Component
			newGeneralConfig={newGeneralConfig}
			generalConfig={generalConfig}
			onApplyButtonClicked={onApplyButtonClicked}
			setSharedDirectoryPath={setSharedDirectoryPath}
			setCacheDirectoryPath={setCacheDirectoryPath}
			setPort={setPort}
		/>
	);
};

export default General;
