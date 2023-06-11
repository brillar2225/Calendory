import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendory from '../assets/logos/Calendory.png';

export default function Root() {
  return (
    <>
      <Helmet>
        <title>Calendory</title>
        <meta
          name='calendory'
          content='日程管理やToDoリスト、そして日記帳まで纏めて管理するアプリ'
        />
        <meta
          name='keywords'
          content='Calendory, カレンドリー, カレンダー, やる事リスト, リスト, ダイアリー, 日記帳, 日記, 日程, タスク, 管理, Calendar, Todo, Todo List, Diary, Journal,'
        />
        <link rel='canonical' href={Calendory} />
      </Helmet>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
