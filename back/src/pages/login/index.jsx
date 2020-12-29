import React, { useState } from 'react'
import styles from './index.less'
import normalImg from '@/assets/img/normal.0447fe9.png'
import greetingImg from '@/assets/img/greeting.1415c1c.png'
import blindfold from '@/assets/img/blindfold.58ce423.png'
import LoginFrom from '@/components/LoginFrom'
import RegisterFrom from '@/components/RegisterFrom'

export default function index() {
  const [isLogin, setIsLogin] = useState(true)
  const [pictureSrc, setPictureSrc] = useState(normalImg)
  return (
    <div className={styles.wrapper}>
      <div className={styles.fromBox}>
        <img src={pictureSrc} alt="" className={styles.picture} />
        <p className={styles.toggleIsLogin}>
          {
            isLogin ?
              <span onClick={() => { setIsLogin(false) }}>我要注册</span> :
              <span onClick={() => { setIsLogin(true) }}>我要登录</span>
          }
        </p>
        {
          isLogin ?
            // 因为是该组件使用这些图片，打包后的路径要基于该组件
            <LoginFrom normalImg={normalImg} greetingImg={greetingImg} blindfold={blindfold} changePictureSrc={src => {
              setPictureSrc(src)
            }} /> :
            <RegisterFrom normalImg={normalImg} greetingImg={greetingImg} blindfold={blindfold} changePictureSrc={src => {
              setPictureSrc(src)
            }} changIsLogin={bool => {
              setIsLogin(bool)
            }} />
        }
      </div>
    </div>
  )
}
