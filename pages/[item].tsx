import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import { setCurrentItem, searchFormInitAction } from "../reducers/search";
import { useDispatch, useSelector } from "react-redux";
import WholePriceInfo from "../components/WholePriceInfo";
import RetailPriceInfo from "../components/RetailPriceInfo";
import Footer from "../components/Footer";
import Head from "next/head";
import Navigation from "../components/Navigation";
import WholeChart from "../components/WholeChart";
import RetailChart from "../components/RetailChart";
import MediaTrend from "../components/MediaTrend";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { getNewsAction, getYoutubeAction } from "../reducers/media";
import wholePrice, {
  getAuctionVolumeDataAction,
  getLastYearWholePriceAction,
  getRecentWholePriceAction,
  getWholeChartDataAction,
} from "../reducers/wholePrice";
import {
  getLastYearRetailPriceAction,
  getRecentRetailPriceAction,
  getRetailChartDataAction,
} from "../reducers/retailPrice";
import ContentReady from "../components/ContentReady";
import ImportExport from "../components/ImportExport";
import {
  getImportDataAction,
  getExportDataAction,
} from "../reducers/importExport";
import MarginBox from "../components/MarginBox";
import { RootState } from "../reducers";
import UnderLine from "../components/UnderLine";
// 품목 상세페이지 동적라우팅 컴포넌트

function Detail() {
  const {
    wholeRecent,
    wholePrev,
    wholeChart,
    auctionChart,
    retailRecent,
    retailPrev,
    retailChart,
    importChart,
    exportChart,
    news,
    youtube,
  } = useSelector(
    ({ wholePrice, retailPrice, importExport, media }: RootState) => ({
      wholeRecent: wholePrice.recentPriceDataDone,
      wholePrev: wholePrice.lastYearPriceDataDone,
      wholeChart: wholePrice.wholeChartDataDone,
      auctionChart: wholePrice.auctionVolumeDataDone,
      retailRecent: retailPrice.recentPriceDataDone,
      retailPrev: retailPrice.lastYearPriceDataDone,
      retailChart: retailPrice.retailChartDataDone,
      importChart: importExport.importDataDone,
      exportChart: importExport.exportDataDone,
      news: media.getNewsDone,
      youtube: media.getYoutubeDone,
    })
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { keyword } = router.query;
  console.log("item페이지 실행", keyword);
  const [search, setSearch] = useState<boolean>(false);
  const portRef = useRef<HTMLDivElement>(null);
  const [portOffset, setPortOffset] = useState<number | null>(0);
  const retailRef = useRef<HTMLDivElement>(null);
  const [retailOffset, setRetailOffset] = useState<number | null>(0);
  const wholeRef = useRef<HTMLDivElement>(null);
  const [wholeOffset, setWholeOffset] = useState<number | null>(0);
  const trendRef = useRef<HTMLDivElement>(null);
  const [trendOffset, setTrendOffset] = useState<number | null>(0);

  const onClickSearchFormOpenButton = useCallback(() => {
    setSearch(true);
  }, [search]);

  useEffect(() => {
    /* window.scrollTo(0, 0); */
    setSearch(false);
    dispatch(searchFormInitAction());
    console.log("Item : name ", keyword);
  }, [keyword]);

  useEffect(() => {
    setTimeout(() => {
      if (portRef.current) {
        setPortOffset(portRef.current.offsetTop);
      } else {
        setPortOffset(null);
      }

      if (retailRef.current) {
        setRetailOffset(retailRef.current.offsetTop);
      } else {
        setRetailOffset(null);
      }

      if (wholeRef.current) {
        setWholeOffset(wholeRef.current.offsetTop);
      } else {
        setWholeOffset(null);
      }

      if (trendRef.current) {
        setTrendOffset(trendRef.current.offsetTop);
      } else {
        setTrendOffset(null);
      }
    }, 100);
    /* setPortOffset(portRef.current.offsetTop); */
  }, [
    keyword,
    portRef.current,
    retailRef.current,
    wholeRef.current,
    trendRef.current,
  ]);

  useEffect(() => {
    console.log(
      "wholeOffset",
      wholeOffset,
      "retailOffset",
      retailOffset,
      "portOffset",
      portOffset,
      "keyword",
      keyword
    );
  }, [portOffset, retailOffset, wholeOffset, trendOffset, keyword]);

  return (
    <>
      <Head>
        <title>Agripa | {keyword}</title>
      </Head>
      <MarginBox
        marginTop={
          !wholeRecent &&
          !wholePrev &&
          !wholeChart &&
          !auctionChart &&
          !retailRecent &&
          !retailPrev &&
          !retailChart &&
          !importChart &&
          !exportChart &&
          !youtube &&
          !news
            ? 5.5
            : 10
        }
      />
      <Navigation
        onClickSearchFormOpenButton={onClickSearchFormOpenButton}
        wholeOffset={wholeOffset}
        retailOffset={retailOffset}
        portOffset={portOffset}
        trendOffset={trendOffset}
        isSearch={search}
      />
      {search && <SearchBar focus={search} isItemPage />}
      {(wholeRecent || wholePrev || wholeChart || auctionChart) && (
        <>
          <div ref={wholeRef}>
            {/* {wholeRef.current && wholeRef.current.offsetTop} */}
            <WholePriceInfo />
            <WholeChart />
          </div>
          <UnderLine />
        </>
      )}

      {(retailRecent || retailPrev || retailChart) && (
        <>
          <div ref={retailRef}>
            {retailRef.current && retailRef.current.offsetTop}
            <RetailPriceInfo />
            <RetailChart />
          </div>
          <UnderLine />
        </>
      )}

      {(importChart || exportChart) && (
        <>
          <div ref={portRef}>
            {portRef.current && portRef.current.offsetTop}
            <ImportExport />
          </div>
          <UnderLine />
        </>
      )}
      <ContentReady />
      {(news || youtube) && (
        <div ref={trendRef}>
          {trendRef.current && trendRef.current.offsetTop}
          <MediaTrend />
        </div>
      )}
      <Footer />
    </>
  );
}

export default Detail;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const ItemCode = context.query.itemcode as string;
    const Keyword = context.query.keyword as string;

    /* const getHtml = async () => {
      try {
        return await axios.get(
          `https://search.naver.com/search.naver?where=image&sm=tab_jum&query=${encodeURIComponent(
            Keyword
          )}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    getHtml().then((html: any) => {
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.img_area._item img._img");
      const imgSrc = $bodyList[0].attribs["data-source"];
      context.store.dispatch(setCurrentItemImageSrc(imgSrc));
    }); */
    context.store.dispatch(
      setCurrentItem({
        ItemCode,
        Keyword,
      })
    );

    context.store.dispatch(
      getNewsAction.request({
        itemCode: ItemCode,
        start: 0,
        countPerPage: 5,
      })
    );
    context.store.dispatch(
      getYoutubeAction.request({
        itemCode: ItemCode,
        start: 0,
        countPerPage: 5,
      })
    );

    context.store.dispatch(getRecentWholePriceAction.request(ItemCode));
    context.store.dispatch(getLastYearWholePriceAction.request(ItemCode));
    context.store.dispatch(getWholeChartDataAction.request(ItemCode));
    context.store.dispatch(getAuctionVolumeDataAction.request(ItemCode));
    context.store.dispatch(getRecentRetailPriceAction.request(ItemCode));
    context.store.dispatch(getLastYearRetailPriceAction.request(ItemCode));
    context.store.dispatch(getRetailChartDataAction.request(ItemCode));
    context.store.dispatch(getImportDataAction.request(ItemCode));
    context.store.dispatch(getExportDataAction.request(ItemCode));

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

/* const ItemImageWrapper = styled.div`
  margin-top: 44px;
  padding: 15px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestImg = styled.div`
  width: 80%;
  overflow: hidden;
  text-align: center;
  display: inline-block;
  background: #dbdbdb;
  border: 1px solid black;
  border-radius: 15px;
  color: #fff;
  font-size: 30px;
  & img {
    width: 100%;
  }
`; */
