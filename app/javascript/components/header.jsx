import * as React from "react";
import * as ReactDOM from "react-dom";



const Header = ({ arg }) => {
 return (
	<div className="primaryNav">
		<div className="primaryNav-strip">
			<ul className="coreNav">
				{/* <li className="navItem">
				<a class="coreNavigationLink" href="/assets?tracking_source=nav20"><span class="coreNavigationLabel">Assets</span></a>
				</li> */}
			</ul>
		</div>
	</div>
 );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("header");
 ReactDOM.render(<Header />, rootEl);
});