import * as React from "react";
import { Switch, Route } from "react-router-dom";

import * as Config from "renderer/contexts/Config";

import Navigation from "renderer/components/organisms/settings/Navigation";
import General from "renderer/components/pages/settings/General";
import Video from "renderer/components/pages/settings/Video";
import PageWithNavigation from "renderer/components/templates/PageWithNavigation";

const Index: React.FunctionComponent = () => {
	const { config, dispatch } = React.useContext(Config.Context);

	return (
		<PageWithNavigation navigation={<Navigation />}>
			<Switch>
				<Route exact path="/general">
					<General
						generalConfig={config.general}
						dispatch={dispatch}
					/>
				</Route>
				<Route exact path="/video">
					<Video videoConfig={config.video} dispatch={dispatch} />
				</Route>
			</Switch>
		</PageWithNavigation>
	);
};

export default Index;
