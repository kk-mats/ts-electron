import * as React from "react";

import * as channels from "common/channels";
import * as configTypes from "common/types/config";

export type Action<K extends configTypes.SchemaKeys> =
	| {
			type: typeof channels.updateConfig;
			key: K;
			value: configTypes.Schema[K];
	  }
	| {
			type: "update-config-all";
			value: configTypes.Schema;
	  };

export const reducer = <K extends configTypes.SchemaKeys>(
	state: configTypes.Schema,
	action: Action<K>
): configTypes.Schema => {
	switch (action.type) {
		case channels.updateConfig: {
			window.config.updateConfig(action.key, action.value);
			return {
				...state,
				[action.key]: action.value
			};
		}

		case "update-config-all": {
			return {
				...action.value
			};
		}

		default: {
			return state;
		}
	}
};

const initialState: configTypes.Schema = {
	general: {
		sharedDirectoryPath: "",
		cacheDirectoryPath: "",
		port: 0
	},
	video: {
		FFmpegPath: ""
	}
};

const initialStore: {
	config: configTypes.Schema;
	dispatch: React.Dispatch<Action<configTypes.SchemaKeys>>;
} = {
	config: initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	dispatch: (): void => {}
};

export const Context = React.createContext(initialStore);

type Props = {
	children: React.ReactNode;
};

export const Provider: React.FunctionComponent<Props> = (props: Props) => {
	const { children } = props;
	const [config, dispatch] = React.useReducer(reducer, initialState);
	const ref = React.useRef();

	React.useEffect(() => {
		(async (): Promise<void> => {
			dispatch({
				type: "update-config-all",
				value: await window.config.fetchConfigAll()
			});
		})();
	}, [ref]);

	return (
		<Context.Provider value={{ config, dispatch }}>
			{children}
		</Context.Provider>
	);
};
