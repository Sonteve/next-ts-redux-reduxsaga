import React, { useCallback, useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { getMoreYoutubeAction } from "../reducers/media";
import { useDispatch } from "react-redux";
import moment from "moment";
import MoreMediaButton from "./MoreMediaButton";
import { useRouter } from "next/router";
import { Youtube as YoutubeData } from "../interfaces/media";

interface Props {
  datas: YoutubeData | null;
}

const Youtube = ({ datas }: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(true);
  const youtubeData = datas?.data;
  const meta = datas?.meta;
  const router = useRouter();
  const itemCode = router.query.itemcode as string;

  const getMoreYoutubeData = useCallback(() => {
    /* console.log("itemCode", itemCode); */
    if (!youtubeData || !meta) return;
    if (youtubeData.length + 5 > meta.totalCount) {
      dispatch(
        getMoreYoutubeAction.request({
          itemCode,
          start: meta.startIndex + 5,
          countPerPage: meta.totalCount - meta.startIndex,
        })
      );
      setVisible(false);
    } else {
      dispatch(
        getMoreYoutubeAction.request({
          itemCode,
          start: meta.startIndex + 5,
          countPerPage: 5,
        })
      );
    }
    console.log("more youtubeData");
  }, [youtubeData, meta]);

  /* useEffect(() => {
    if (datas) return;
    dispatch(
      getYoutubeAction.request({
        itemCode,
        start: 0,
        countPerPage: 5,
      })
    );
  }, []); */

  return (
    <YoutubeBlock>
      <LazyLoad height={338}>
        {/* <YoutubeTT>인기뉴스</YoutubeTT> */}
        {youtubeData?.map((data, index) => (
          <YoutubeItemWrapper
            key={index}
            target="_blank"
            href={`https://www.youtube.com/watch?v=${data.VideoID}`}
          >
            <Thumbnail>
              <img src={data.ThumbnailURL} alt={data.Title} />
            </Thumbnail>
            <Desc>
              <DescInfo>
                <DescTitle>{data.Title}</DescTitle>
                <ChannelTitle>{data.ChannelTitle}</ChannelTitle>
                <PublishedDate>
                  {moment(data.PublishedAt).format("YY.MM.DD")}
                </PublishedDate>
              </DescInfo>
            </Desc>
          </YoutubeItemWrapper>
        ))}
      </LazyLoad>
      {visible && <MoreMediaButton getMoreYoutubeData={getMoreYoutubeData} />}
    </YoutubeBlock>
  );
};

export default Youtube;

const ChannelTitle = styled.div`
  width: 100%;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 1vw 0;
  font-size: 1.2rem;
`;

const PublishedDate = styled.div`
  font-size: 1.2rem;
  color: #555;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  flex: 1;

  & img {
    display: block;
    width: 100%;
  }
`;
const Desc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  box-sizing: border-box;
  padding: 0 1.5rem;
`;
const DescTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 1.5rem;
  color: #555;
`;
const DescInfo = styled.div`
  width: 100%;
`;

const YoutubeBlock = styled.div``;

const YoutubeItemWrapper = styled.a`
  display: flex;
  align-items: center;
  padding: 2rem;
  text-decoration: none;
  margin-bottom: 10px;
  border-bottom: 1px solid #ececec;
`;
