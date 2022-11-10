import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu";

function HomePage() {
    const [filterValue, setFilterValue] = React.useState("");

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* PROP DRILLING */}
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header />
                <Timeline strSearch={filterValue} playlists={config.playlists}>
                    Content
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px
    }
`;
const StyledBanner = styled.div`
    /* background-image: url(${config.bg}); */ // this is the simples way
    background-image: url(${({ bg }) => bg}); // this is the most versatile
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/> {/*this is part of the versatile*/}
            {/* {<img src="https://unsplash.com/photos/ePpaQC2c1xA" />} */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({strSearch, ...props}) {
    // console.log("Inside the component", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    // Statement vs return by expression
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const strSearchNormalized = strSearch.toLowerCase(); 
                                return titleNormalized.includes(strSearchNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}