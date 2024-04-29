import * as React from "react";

const OtherProjects = () => {
  return (
    <div className="moreProjects">
      <div className="moreProjectsHeader">
        <div className="moreProjectsProjectOwner">
          <div className="ownerAvatar">
            <img src="/javon.png" />
          </div>
          <div className="projectCaption">
          <div class="projectTitleRow">
            <h1 class="otherProjectTitle">Jevon Terance</h1>
          </div>
          <div className="FollowButton">
            <div class="userFollow" >
              <a tabindex="0" role="button" className="followButtonRef">
                <span class="rf-button__label">Following</span>
              </a>
          </div>
          </div>
          </div>
        </div>
      </div>

      <div className="moreProjectsProjects">
        <div className="moreProjectsProject">

            <img className="projectImage" src="/bazaar.png"/>

        </div>
        <div className="moreProjectsProject">

            <img className="projectImage" src="/billy.png"/>

        </div>
        <div className="moreProjectsProject">

            <img className="projectImage" sizes="390px" src="/purse.png"/>

        </div>
        <div className="moreProjectsProject">
 
            <img className="projectImage" sizes="390px" src="/starter.png"/>

        </div>
      </div>

    </div>
  )
}

export default OtherProjects;