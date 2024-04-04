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
                <img src="/javon.png" />
              </div>
              <div className="projectCaption">
              <div class="projectTitleRow">
                <h1 class="projectTitle">Jevon Terance</h1>
              </div>
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