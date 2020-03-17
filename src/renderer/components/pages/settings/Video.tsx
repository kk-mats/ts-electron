import * as React from "react";
import { List, DialogActions } from "@material-ui/core";

import * as channels from "common/channels";
import * as configTypes from "common/types/config";

import * as Config from "renderer/contexts/Config";

import DirectorySelectItem from "renderer/components/organisms/settings/DirectorySelectItem";
import SettingContents from "renderer/components/organisms/settings/SettingContents";

type ComponentProps = {
	newVideoConfig: configTypes.Video;
	videoConfig: configTypes.Video;
	onApplyButtonClicked: React.MouseEventHandler<HTMLButtonElement>;
	setFFmpegPath: (path: string) => void;
};

const Component: React.FunctionComponent<ComponentProps> = (
	props: ComponentProps
) => {
	const {
		newVideoConfig,
		videoConfig,
		onApplyButtonClicked,
		setFFmpegPath
	} = props;

	return (
		<SettingContents
			title="Video"
			value={newVideoConfig}
			oldValue={videoConfig}
			onApplyButtonClicked={onApplyButtonClicked}
		>
			<List>
				<DirectorySelectItem
					label="FFmpeg"
					dialogOptions={{ properties: ["openFile"] }}
					path={newVideoConfig.FFmpegPath}
					setPath={setFFmpegPath}
				/>
			</List>
		</SettingContents>
	);
};

type Props = {
	videoConfig: configTypes.Video;
	dispatch: React.Dispatch<Config.Action<"video">>;
};

const Video: React.FunctionComponent<Props> = (props: Props) => {
	const { videoConfig, dispatch } = props;

	const [newVideoConfig, setNewVideoConfig] = React.useState(videoConfig);

	const onApplyButtonClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
		dispatch({
			type: channels.updateConfig,
			key: "video",
			value: newVideoConfig
		});
	};

	const setFFmpegPath = (path: string): void => {
		setNewVideoConfig({
			...newVideoConfig,
			FFmpegPath: path
		});
	};

	return (
		<Component
			newVideoConfig={newVideoConfig}
			videoConfig={videoConfig}
			onApplyButtonClicked={onApplyButtonClicked}
			setFFmpegPath={setFFmpegPath}
		/>
	);
};

export default Video;
