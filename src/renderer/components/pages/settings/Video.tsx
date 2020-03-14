import * as React from "react";
import { Divider, List } from "@material-ui/core";

import DirectorySelectItem from "renderer/components/organisms/settings/DirectorySelectItem";

import SettingContents from "renderer/components/organisms/settings/SettingContents";

type ComponentProps = {
	FFmpegPath: string;
	setFFmpegPath: (path: string) => void;
};

const Component: React.FunctionComponent<ComponentProps> = (
	props: ComponentProps
) => {
	const { FFmpegPath, setFFmpegPath } = props;

	return (
		<SettingContents title="Video">
			<List>
				<DirectorySelectItem
					label="FFmpeg"
					dialogOptions={{ properties: ["openFile"] }}
					path={FFmpegPath}
					setPath={setFFmpegPath}
				/>
				<Divider />
			</List>
		</SettingContents>
	);
};

type Props = {};

const Video: React.FunctionComponent<Props> = (props: Props) => {
	const [FFmpegPath, setFFmpegPath] = React.useState(" ");

	return <Component FFmpegPath={FFmpegPath} setFFmpegPath={setFFmpegPath} />;
};

export default Video;
