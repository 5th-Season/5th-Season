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
            <div class="projectContentWrap">
              <div className="projectModule">
                <section className="projectSecionSingle">
                  <img src="/javon1.png" />
                </section>
                <section className="projectSecionDuo"> 
                  <img src="/javon2.png" />
                  <img src="/javon3.png" />
                </section>
                <section className="projectSecionSingle">
                  <img src="/javon4.png" />
                </section>
                <section className="projectSecionSingle">
                  <img src="/javon5.png" />
                </section>
                <section className="projectSecionDuo"> 
                  <img src="/javon7.png" />
                  <img src="/javon8.png" />
                </section>
                <section className="thanksSection">
                  <div className="thanksMessage">
                    <div class="main-text">
                     <div>
                      <br/>
                      <span className="texteditor-inline-color">
                        <span class="texteditor-inline-fontsize">Thanks for watching!</span>
                      </span>
                    </div>
                    <div>
                      <span className="texteditor-inline-fontsize">
                        <a href="https://supremesneaker.org/" target="_blank" rel="nofollow">Website</a> | <a href="https://www.instagram.com/jevonterance/" target="_blank" rel="nofollow">Instagram</a>
                      </span>
                    </div>
</div>
                  </div>
                </section>
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