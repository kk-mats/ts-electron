import * as React from "react";
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	TextField
} from "@material-ui/core";

type Props = {
	label: string;
	value: number;
	setValue: (port: number) => void;
};

const NumberField: React.FunctionComponent<Props> = (props: Props) => {
	const { label, value, setValue } = props;

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(Number(event.target.value));
	};

	return (
		<ListItem>
			<ListItemText primary={label} />
			<ListItemSecondaryAction>
				<TextField type="number" value={value} onChange={onChange} />
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default NumberField;
