'use client';
//react lib
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

//style
import styles from './page.module.css';

//component
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';
import Form from '@/components/Form';
import { EnterCreate } from '@/components/Button/RouteButton';

type CardItem = {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get('word');
  // const page = searchParams.get('page');

  const value = search == null ? '' : search;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/word/search?word=${
        search == null ? '' : search
      }`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((searchData) => {
        setData(searchData);
        setLoading(true);
      })
      .catch(() => {});
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.searchInput}>
          <SearchInput value={value} />
        </div>
        <div className={styles.create}>
          <EnterCreate />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchResult}>
          {loading ? (
            data.length != 0 ? (
              data.map((item: CardItem) => (
                <div key={item.id}>
                  <Card item={item} />
                </div>
              ))
            ) : (
              // 검색 결과가 없을 때
              <Card
                item={{
                  id: '',
                  wordName: '검색 결과가 없습니다.',
                  wordDescription: '철자가 맞는지 다시한번 확인해 보세요',
                  wordExample: '',
                  hashtagList: [''],
                  memberNickname: '',
                  createDate: '',
                }}
              />
            )
          ) : (
            // 로딩중일때
            <Card
              item={{
                id: '',
                wordName: '검색결과를 가져오는 중입니다.',
                wordDescription: '',
                wordExample: '',
                hashtagList: [''],
                memberNickname: '',
                createDate: '',
              }}
            />
          )}
        </div>
        <div>
          <div className={styles.survey}>
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}