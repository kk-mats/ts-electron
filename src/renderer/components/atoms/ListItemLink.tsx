import * as React from "react";
import { NavLink, LinkProps } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type Props = {
	icon: React.ReactElement;
	primary: string;
	to: string;
};

const ListItemLink: React.FunctionComponent<Props> = (props: Props) => {
	const { icon, primary, to } = props;

	const renderLink = React.useMemo(
		() =>
			// eslint-disable-next-line react/display-name
			React.forwardRef<any, Omit<LinkProps, "to">>(
				// eslint-disable-next-line react/jsx-props-no-spreading
				(itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps} />
			),
		[to]
	);

	return (
		<ListItem button component={renderLink}>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			<ListItemText primary={primary} />
		</ListItem>
	);
};

export default ListItemLink;
