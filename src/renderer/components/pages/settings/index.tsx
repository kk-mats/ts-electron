import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "renderer/components/organisms/settings/Navigation";
import General from "renderer/components/pages/settings/General";
import Video from "renderer/components/pages/settings/Video";
import PageWithNavigation from "renderer/components/templates/PageWithNavigation";

type Props = {};

const Index: React.FunctionComponent<Props> = (props: Props) => {
	return (
		<PageWithNavigation navigation={<Navigation />}>
			<Switch>
				<Route exact path="/general">
					<General />
				</Route>
				<Route exact path="/video">
					<Video />
				</Route>
			</Switch>
		</PageWithNavigation>
	);
};

export default Index;
