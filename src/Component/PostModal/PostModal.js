import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../../actions";

const PostModal = (props) => {
  //css
  const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
  `;

  const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
  `;

  const Header = styled.div`
    display: block;
    padding: 12px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 18px;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: rgba(0, 0, 0, 0.6);
      font-weight: 400;
    }
    button {
      height: 40px;
      width: 40px;
      border: none;
      border-radius: 50%;
      min-width: auto;
      svg,
      img {
        pointer-events: none;
      }
    }
  `;

  const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
  `;

  const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,
    img {
      width: 48px;
      height: 48px;
      background-clip: content-box;
      border: 2px solid transparent;
      border-radius: 50%;
    }
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      margin-left: 5px;
    }
  `;

  const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
  `;

  const AssetButton = styled.button`
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    height: 40px;
    min-width: auto;
  `;

  const AttachAsset = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
      width: 40px;
    }
  `;

  const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
      svg {
        margin-right: 5px;
      }
      span {
        padding-left: 4px;
      }
    }
  `;

  const PostButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    height: 30px;
    border-radius: 20px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.3)" : "#0a66c2")};
    color: white;
    font-size: 14px;
    &:hover {
      background: ${(props) => (props.disabled ? "" : "#004182")};
      cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
    }
  `;

  const Editor = styled.div`
    padding: 12px 24px;
    textarea {
      border: none;
      outline: none;
      width: 100%;
      min-height: 100px;
      resize: none;
      font-family: inherit;
      font-size: 16px;
    }
    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  `;
  const PhotoContent = styled(SharedContent)`
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  `;

  const PhotoEditor = styled.div`
    padding: 48px 0;
    label {
      font-family: inherit;
      color: #0a66c2;
      font-size: 16px;
    }
    img {
      width: 100%;
    }
  `;

  const BackButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    height: 30px;
    border-radius: 20px;
    color: #0a66c2;
    font-size: 14px;
    border: 1px solid;
    margin-right: 10px;
    cursor: default;
  `;
  const PhotoCreation = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 12px 24px 12px 16px;
  `;

  //********************************************************************************************
  //state

  const [editorText, setEditorText] = useState(""); //postmodal textarea
  const [photoToggle, setPhotoToggle] = useState("close");
  const [videoToggle, setVideoToggle] = useState("close");
  const [shareImage, setShareImage] = useState("");
  const [file, setFile] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const videoRef = useRef(null);

  const reset = (e) => {
    //reset whatever written in textarea
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
  };

  const photoClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (photoToggle) {
      case "open":
        setPhotoToggle("close");
        break;
      case "close":
        setPhotoToggle("open");
        break;
      default:
        setPhotoToggle("close");
        break;
    }
    setShareImage("");
  };
  const videoClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (videoToggle) {
      case "open":
        setVideoToggle("close");
        break;
      case "close":
        setVideoToggle("open");
        break;
      default:
        setVideoToggle("close");
        break;
    }
    setVideoLink("");
  };

  const photoType = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is  a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([file], { type: "video/mp4" }));
    setVideoLink(src);
  }, [file]);

  return (
    <>
      {props.showModal === "open" &&
      photoToggle === "close" &&
      videoToggle === "close" ? ( //popping postmodal functionality
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="Images/close-icon.svg" alt="ph" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="Images/user.svg" alt="to" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAsset>
                <AssetButton>
                  <img
                    src="Images/share-image.svg"
                    onClick={photoClick}
                    alt="share"
                  />
                </AssetButton>
                <AssetButton>
                  <img
                    onClick={videoClick}
                    src="Images/share-video.svg"
                    alt="share"
                  />
                </AssetButton>
              </AttachAsset>
              <ShareComment>
                <AssetButton>
                  <img src="Images/share-comment.svg" alt="comment" />
                  <span>Anyone</span>
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      ) : photoToggle === "open" && videoToggle === "close" ? (
        <Container>
          <Content>
            <Header>
              <h2>Edit your photo</h2>
              <button onClick={(e) => reset(e)}>
                <img src="Images/close-icon.svg" alt="ph" />
              </button>
            </Header>
            <PhotoContent>
              <PhotoEditor>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  onChange={photoType}
                />
                {!shareImage ? (
                  <p>
                    <label htmlFor="file"> Select images to share </label>
                  </p>
                ) : null}
                {shareImage && (
                  <img src={URL.createObjectURL(shareImage)} alt="" />
                )}
              </PhotoEditor>
            </PhotoContent>
            <PhotoCreation>
              <BackButton onClick={photoClick}> Back </BackButton>
              <PostButton
                disabled={!shareImage ? true : false}
                onClick={(e) => postArticle(e)}
              >
                {" "}
                Post{" "}
              </PostButton>
            </PhotoCreation>
          </Content>
        </Container>
      ) : videoToggle === "open" ? (
        <Container>
          <Content>
            <Header>
              <h2>Select/Edit your video</h2>
              <button onClick={(e) => reset(e)}>
                <img src="Images/close-icon.svg" alt="ph" />
              </button>
            </Header>
            <PhotoContent>
              <PhotoEditor>
                <input
                  type="file"
                  accept="video/*"
                  id="file"
                  ref={videoRef}
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {!file ? (
                  <p>
                    <label htmlFor="file"> Select video to share </label>
                  </p>
                ) : null}
                {videoLink && file && (
                  <video
                    width={"100%"}
                    height={"400px"}
                    controls
                    src={videoLink}
                  />
                )}
              </PhotoEditor>
            </PhotoContent>
            <PhotoCreation>
              <BackButton onClick={videoClick}> Back </BackButton>
              <PostButton
                disabled={!videoLink ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </PhotoCreation>
          </Content>
        </Container>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
