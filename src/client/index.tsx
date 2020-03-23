import * as React from "react";
import * as ReactDom from "react-dom";

const Index: React.FunctionComponent = () => {
	return <div>Root</div>;
};

ReactDom.render(<Index />, document.getElementById("app"));
