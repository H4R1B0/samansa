'use client';
import CreateButton from '@/components/Button/CreateButton/index';
import ValueInput from '@/components/Input/ValueInput/index';
import Textarea from '@/components/Textarea/index';
import styles from './page.module.css';
import { useState } from 'react';
import Image from 'next/image';
import hamburgerIcon from '@/public/assets/hamburgerIcon.png';

type ImageLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

export default function CreatePage() {
  const [word, setWord] = useState(''); // 등록할 단어
  const [meaning, setMeaning] = useState(''); // 단어의 뜻
  const [example, setExample] = useState(''); // 예시 문장
  const [hashTag, setHashTag] = useState(''); // 해시 태그
  const imageLoader = ({ src, width, quality }: ImageLoaderParams) => {
    return `${process.env.NEXT_PUBLIC_REDIRECT_URI}/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <div className={styles.components}>
      <div className={styles.regist}>
        <div className={styles.title}>밈 등록 페이지</div>
        <div className={styles.icon}>
          <Image src={hamburgerIcon} loader={imageLoader} height={70} width={80} alt="햄버그바" />
        </div>
        <div className={styles.registcard}>
          <div className={styles.wordTag}>
            등록하고 싶은 단어
            <span>* 필수 입력사항</span>
          </div>
          <ValueInput
            setValue={setWord}
            variant={'word'}
            name={'단어등록'}
            value={word}
          ></ValueInput>
          <div className={styles.wordTag}>
            단어의 뜻<span>* 필수 입력사항</span>
          </div>
          <Textarea
            setValue={setMeaning}
            variant={'decs'}
            name={'단어의 뜻'}
            value={meaning}
          ></Textarea>
          <div className={styles.wordTag}>예시 문장</div>
          <Textarea
            setValue={setExample}
            variant={'example'}
            name={'예시문장'}
            value={example}
          ></Textarea>
          <div className={styles.wordTag}>해시 태그</div>
          <ValueInput
            setValue={setHashTag}
            variant={'tag'}
            name={'헤시 태그.'}
            value={hashTag}
          ></ValueInput>
        </div>
        <div className={styles.button}>
          <CreateButton
            word={word}
            meaning={meaning}
            example={example}
            hashTag={hashTag}
          ></CreateButton>
        </div>
      </div>
    </div>
  );
}