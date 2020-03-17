import * as React from "react";

import * as Config from "renderer/contexts/Config";
import Settings from "renderer/components/pages/settings";

const Root: React.FunctionComponent = () => {
	return (
		<Config.Provider>
			<Settings />
		</Config.Provider>
	);
};

export default Root;
