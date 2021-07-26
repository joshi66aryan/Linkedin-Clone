import { useState , useEffect } from 'react';
import React from 'react'
import styled from 'styled-components'
import PostModal from '../PostModal/PostModal'
import { connect } from 'react-redux';
import { getArticleAPI } from '../../actions';


function Main(props) {

    const [showModal,setShowModal] = useState("close");

    useEffect(() => {
        props.getArticles();
    }, []);
    
    const handleClick = (e) =>{
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            return;
        }
        switch(showModal){
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:    
                setShowModal("close");
                break; 
        }
    };

    const Container = styled.div`
        grid-area: main;
    `;

    const Content = styled.div`
        text-align:center;
        &>img {
            width : 30px;
        }
    `;

    const CommonCard = styled.div`
        text-align:center;
        overflow:hidden;
        margin-bottom: 8px;
        background-color: #fff;
        border-radius: 5px;
        position:relative;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb( 0 0 0 /20%);
        border:none;
    `;

    const ShareBox = styled(CommonCard)`
        display:flex;
        flex-direction: column;
        color:#958b7b;
        margin: 0 0 8px;
        background: white;
        div{
            button{
                outline:none;
                color: rgba(0,0,0,0.6);
                font-size:14px;
                line-height: 1.5;
                min-height:48px;
                background:transparent;
                border:none;
                display:flex;
                align-items:center;
                font-weight:600;
            }
            &:first-child{
                display:flex;
                align-items:center;
                padding:8px 16px 0px 16px;
                img{
                    width:48px;
                    border-radius:50%;
                    margin-right:8px;
                }
                button{
                    margin: 4px 0 ;
                    flex-grow:1;
                    padding-left:16px;
                    border: 1px solid rgba(0,0,0,0.15);
                    border-radius:35px;
                    background-color:white;
                    text-align: left;
                }
            }
            &:nth-child(2) {
                display: flex;
                flex-wrap:wrap;
                justify-content: space-around;
                padding-bottom: 4px;

                button{
                    img{
                        margin : 0 4px 0 -2px;
                    }
                    span{
                        color:#70b5f9;
                    }
                }
            }
        }
    `;

    const Article = styled(CommonCard)`
        padding:0;
        margin: 0 0 8px;
        overflow: hidden;
    `;

    const SharedActor = styled.div`
        padding-right:40px;
        flex-wrap:nowrap;
        padding:12px 16px 0;
        margin-bottom: 8px;
        align-items:center;
        display:flex;
        a{
            margin-right:12px;
            flex-grow:1;
            overflow: hidden;
            display: flex;
            text-decoration: none;
            img{
                width:48px;
                height:48px;
                border-radius:50%;
            }
            & > div {
                display : flex;
                flex-direction:column;
                flex-grow:1;
                flex-basis:0;
                margin-left: 8px;
                overflow: hidden;
                span{
                    text-align:left;
                    &:first-child {
                        font-size:14px;
                        font-weight:700;
                        color: rgba(0,0,0,1);
                    }
                    &:nth-child(2) {
                        font-size:12px;
                        color: rgba(0, 0, 0, 0.6);
                    }
                    &:nth-child(3) {
                        font-size:12px;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }
        button{
            position: absolute;
            right:12px;
            top:0;
            background: transparent;
            border:none;
            outline:none;
        }
    `;

    const Description = styled.div`
        text-align:left ;
        padding : 6px 16px 6px 20px;
        overflow:hidden;
        color:rgba(0,0,0,0.9);
        font-size: 16px;
    `;

    const SharedImage = styled.div`
        margin-top: 8px;
        width:100%;
        display:block;
        position:relative;
        background-color:#f9fafb;
        img{
            object-fit: contain;
            width:100%;
            height:100%;
        }
    `;

    const SocialCount = styled.ul`
        line-height: 1.3;
        display: flex;
        align-items:flex-start;
        overflow:auto;
        margin:0 16px;
        padding: 8px 0 ;
        border-bottom: 1px solid #e9e5df;
        list-style: none;
        li{
            margin-right: 5px;
            font-size: 12px;
            button{
                display:flex;
                border:none;
                background-color:white;
            }
        }

    `;
    const SocialAction = styled.div`
        align-items:center;
        display:flex;
        justify-content: flex-start;
        margin:0;
        min-height:40px;
        padding:4px 8px;
        button{
            display: inline-flex;
            align-items:center;
            border:none;
            background-color: white;
            padding:8px;
            @media(min-height:768px){
                span{
                    margin-left:8px;
                }
            }

        }
    `;

    return (
        <>
 
          <Container>
           <ShareBox>
               <div>
                    {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
                    <button onClick = {handleClick} disabled={props.loading ?true:false}>Start a post</button>
               </div>
                <div>
                    <button >
                        <img src="/images/photo-icon.svg" alt=""/>
                        <span>Photo</span>
                    </button>
                    <button >
                        <img src="/images/video-icon.svg" alt=""/>
                        <span>
                            video
                        </span>
                    </button>
                    <button>
                        <img src="/images/event-icon.svg" alt=""/>
                        <span>
                            event
                        </span>
                    </button>
                    <button>
                        <img src="/images/article-icon.svg" alt=""/>
                        <span>Write article</span>
                    </button>
                </div>
           </ShareBox> 
           {
                props.articles.length === 0 ?
                <div> { props.loading ? <img src='./images/spin-loader.gif'/> : <p>There are no articles</p> }</div>
                 :
                <Content>
                    { props.loading && <img src='./images/spin-loader.gif'/> }
                    { props.articles.length > 0 && 
                        props.articles.map((articles, key ) =>(  
                        
                            <Article key ={key}>
                                <SharedActor>
                                    <a>
                                        <img src={articles.actor.image} alt=""/>
                                        <div>
                                            <span>{articles.actor.title}</span>
                                            <span>{articles.actor.description}</span>
                                            <span>{articles.actor.date.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </a>
                                    <button>
                                        <img src="/images/ellipsis.svg" alt=""/>
                                    </button>
                                </SharedActor>
                                <Description>
                                    {articles.description}
                                </Description>
                                <SharedImage>
                                    <a>
                                        {!articles.sharedImg && articles.video ?
                                            <video width={"100%"} height={"400px"} controls src={articles.video}/>
                                            :
                                            (
                                                articles.sharedImg && <img src ={articles.sharedImg}/>
                                            )

                                        }
                                    </a>
                                </SharedImage>
                                <SocialCount>
                                    <li>
                                        <button>
                                            <img 
                                                src="/images/like.svg" 
                                                alt=""
                                            />  
                                            <img 
                                                src="/images/clap.svg" 
                                                alt=""
                                            />
                                            <span>75</span> 
                                        </button>
                                    </li>
                                    <li>
                                        <a>
                                           {articles.comments} comments
                                        </a>
                                    </li>
                                </SocialCount>
                                <SocialAction>
                                    <button>
                                        <img src="/images/likedIcon.svg" alt=""/>
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img src="/images/comment.svg" alt=""/>
                                        <span>Comments</span>
                                    </button>
                                    <button>
                                        <img src="/images/share.svg" alt=""/>
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img src="/images/send.svg" alt=""/>
                                        <span>Send</span>
                                    </button>
                                </SocialAction>
                            </Article>
                        ))
                    }    
                </Content>
            }
           <PostModal showModal = {showModal}  handleClick = {handleClick}/>
          </Container>
       </>
    )
}

const mapStateToProps=(state)=>{
    return{
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    }
}
const mapDispatchToProps=(dispatch)=>({
    getArticles:() => dispatch(getArticleAPI())
})
export default connect(mapStateToProps,mapDispatchToProps)(Main);