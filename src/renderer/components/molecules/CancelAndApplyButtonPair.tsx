import * as React from "react";
import { Button, ButtonProps } from "@material-ui/core";

type OptionalProps = ButtonProps & {
	component?: React.ElementType;
};

type Props = {
	cancelButtonProps: OptionalProps;
	applyButtonProps: OptionalProps;
};

const CancelAndApplyButtonSet: React.FunctionComponent<Props> = (
	props: Props
) => {
	const { cancelButtonProps, applyButtonProps } = props;

	return (
		<>
			<Button {...cancelButtonProps}>
				{cancelButtonProps.children || "Cancel"}
			</Button>
			<Button {...applyButtonProps}>
				{applyButtonProps.children || "Apply"}
			</Button>
		</>
	);
};

export default CancelAndApplyButtonSet;
