import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme
} from "@material-ui/core/styles";
import * as isEqual from "react-fast-compare";

import CancelAndApplyButtonPair from "renderer/components/molecules/CancelAndApplyButtonPair";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			top: "auto",
			bottom: 0
		},
		grow: {
			flexGrow: 1
		}
	})
);

type Props = {
	title: string;
	value: unknown;
	oldValue: unknown;
	onApplyButtonClicked: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

// eslint-disable-next-line react/display-name
const LinkBehavior = React.forwardRef<any, Omit<LinkProps, "to">>(
	(props, ref) => <Link ref={ref} to="/" {...props} />
);

const SettingItemsWithTitle: React.FunctionComponent<Props> = (
	props: Props
) => {
	const { title, value, oldValue, onApplyButtonClicked, children } = props;
	const classes = useStyles(useTheme());

	const [onProgress, setOnProgress] = React.useState<{
		value: boolean;
		applyButtonChildren?: "Restarting server...";
	}>({
		value: false,
		applyButtonChildren: undefined
	});

	const onApplyClicked: React.MouseEventHandler<HTMLButtonElement> = event => {
		setOnProgress({
			value: true,
			applyButtonChildren: "Restarting server..."
		});
		onApplyButtonClicked(event);
		setOnProgress({
			value: false,
			applyButtonChildren: undefined
		});
	};

	return (
		<div>
			<Typography variant="h5" component="h2">
				{title}
			</Typography>
			{children}
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<div className={classes.grow} />
					<CancelAndApplyButtonPair
						cancelButtonProps={{
							component: LinkBehavior
						}}
						applyButtonProps={{
							disabled:
								isEqual.default(value, oldValue) ||
								onProgress.value,
							onClick: onApplyClicked
						}}
					/>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default SettingItemsWithTitle;
