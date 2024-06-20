import * as React from "react";

const IMAGE_OPTIONS = [
  "https://mir-s3-cdn-cf.behance.net/projects/404/bbfca0201191827.Y3JvcCw4NTEsNjY2LDAsNDEx.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/f18409192606781.Y3JvcCwyNDgwLDE5MzksMCwzNDM.png",
  "https://mir-s3-cdn-cf.behance.net/projects/404/5a7872192601261.Y3JvcCwxNTU5LDEyMTksNTk0LDQyOA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/404/e168fd162774099.Y3JvcCwxMDIyLDgwMCw0NSww.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/bb10db186335523.Y3JvcCw0MDk2LDMyMDMsMCwyNzM.png",
  "https://mir-s3-cdn-cf.behance.net/projects/404/178cf7166242179.Y3JvcCwxNDAwLDEwOTUsMCw2NQ.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/3c4cfd200139477.Y3JvcCwyODEyLDIxOTksMCw2OQ.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/91c7ad196034489.Y3JvcCwzMjMyLDI1MjgsMCww.png",
  "https://mir-s3-cdn-cf.behance.net/projects/115/a5fa59197921359.Y3JvcCwxMDA3LDc4OCwyMDQsMA.png",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/030496110860863.Y3JvcCwxNDAwLDEwOTUsMCwxOTQ.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/a6171c185851747.Y3JvcCwyNTU2LDIwMDAsMjIxLDA.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/81b68e186337863.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/c0866f67122107.Y3JvcCwxMjAwLDkzOCwwLDI2.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/ed727f197461843.Y3JvcCwxNDIyLDExMTIsMzgsMA.jpg"
]

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const GridItem = (props) => {
    return (
        <div className="gridItem">
            <div className="innerGridItem">
                <div className="gridTopRow">
                    <div className="thumbnail">
                      <img src={getRandomElement(IMAGE_OPTIONS)} class="e2e-UserSummary-coverImage UserSummary-ownerWorkThumbnailImage-JTU" loading="lazy" alt="Project thumbnail - Lannock"/>
                    </div>

                    <div className="thumbnail">
                      <img src={getRandomElement(IMAGE_OPTIONS)} class="e2e-UserSummary-coverImage UserSummary-ownerWorkThumbnailImage-JTU" loading="lazy" alt="Project thumbnail - Lannock"/>
                    </div>

                    <div className="thumbnail">
                      <img src={getRandomElement(IMAGE_OPTIONS)} class="e2e-UserSummary-coverImage UserSummary-ownerWorkThumbnailImage-JTU" loading="lazy" alt="Project thumbnail - Lannock"/>
                    </div>

                </div>

                <div className="UserInfo">
                    <div className="UserInfo-Avatar">
                        <div className="UserInfo-ImageWrap">
                          {props.avatar && <img src={props.avatar} />}
                            {!props.avatar && <img src="https://mir-s3-cdn-cf.behance.net/user/115/8e476f199493.65f3771b78f7d.png" />}
                        </div>

                    </div>
                    <div className="UserInfo-Data">
                        <div className="UserInfo-Name">{props.name}</div>
                        <div className="UserInfo-Location">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4808 -20688 14.286 20" className="UserSummaryInfo-locationIcon"><g><path d="M-4800.857-20688a7.143 7.143 0 0 0-7.143 7.143c0 5.714 7.143 12.857 7.143 12.857s7.143-7.143 7.143-12.857a7.142 7.142 0 0 0-7.143-7.143zm0 10a2.857 2.857 0 1 1 2.857-2.859 2.858 2.858 0 0 1-2.857 2.859z"></path></g></svg>
                          <span>{props.location}</span>
                        </div>
                        <div className="UserInfo-Available">
                          <button><span>Featured</span></button>
                        </div>
                        <div className="UserInfo-CollabButton">
                            <button>{`Collab with ${props.name} 🤘`}</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GridItem;