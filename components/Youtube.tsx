import React, { useEffect, useState } from "react";
import { YoutubeData } from "../interfaces/youtube";
import styled from "styled-components";
import { youtubeData } from "../utils/dummy";
import LazyLoad from "react-lazyload";

const Youtube = () => {
  const [youtube, setYoutube] = useState<YoutubeData[]>();

  useEffect(() => {
    setYoutube(youtubeData);
  }, []);

  return (
    <YoutubeBlock>
      <LazyLoad height={338}>
        {/* <YoutubeTT>인기뉴스</YoutubeTT> */}
        {youtube?.map((data, index) => (
          <YoutubeItemWrapper key={index}>
            <YoutubeContent>
              <Thumbnail>
                <img src="http://placehold.it/130x80" />
              </Thumbnail>
              <Detail>
                <DetailLeft>{data.title}</DetailLeft>
                <DetailRight>
                  <div>{data.channel}</div>
                  <div>{data.createdAt}</div>
                </DetailRight>
              </Detail>
            </YoutubeContent>
          </YoutubeItemWrapper>
        ))}
      </LazyLoad>
    </YoutubeBlock>
  );
};

export default Youtube;

const Thumbnail = styled.div``;
const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 15px;
`;
const DetailLeft = styled.div``;
const DetailRight = styled.div``;

const YoutubeBlock = styled.div``;

const YoutubeItemWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const YoutubeContent = styled.div`
  display: flex;
  width: 100%;
`;
