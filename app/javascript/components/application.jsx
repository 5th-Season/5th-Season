import * as React from "react";
import * as ReactDOM from "react-dom";



const App = ({ arg }) => {
 return (
 <div className="topPanel">
  <main>
    <div className="siteContent">
      <div>
        <div className="mainContent">
          <div className="mainProject">
            <div className="projectOwner">
              <div className="ownerAvatar">
                <img src="https://mir-s3-cdn-cf.behance.net/user/100/3dd2973423597.619b4ec2e9a46.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
 </div>
 );
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading React")
  const rootEl = document.getElementById("root");
 ReactDOM.render(<App />, rootEl);
});