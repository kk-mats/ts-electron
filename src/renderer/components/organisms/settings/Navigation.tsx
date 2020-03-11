import * as React from "react";
import { List } from "@material-ui/core";
import { Tune, Movie } from "@material-ui/icons";

import ListItemLink from "renderer/components/atoms/ListItemLink";

const Navigation: React.FunctionComponent = () => (
	<nav>
		<List component="nav">
			<ListItemLink icon={<Tune />} to="/general" primary="General" />
			<ListItemLink icon={<Movie />} to="/video" primary="Video" />
		</List>
	</nav>
);

export default Navigation;
