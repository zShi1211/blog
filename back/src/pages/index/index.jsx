import React, { useState, useEffect, useRef } from 'react';
import { Upload, message, Input, Button, Col } from 'antd';
import styles from './index.less'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getHome, updateHome, addHome } from '../../service/api/home'

const { TextArea } = Input;

const audio = new Audio();


const Home = () => {
  const [homeInfo, setHomeInfo] = useState({})
  const [homeEmpty, setHomeEmpty] = useState(false)
  const [paused, setPaused] = useState(audio.paused)


  useEffect(() => {
    (async () => {
      const res = await getHome()
      if (res.code === 0) {
        if (res.data) {
          setHomeInfo(res.data);
          audio.src = res.data.bgm;
        } else {
          // 如果首屏没有信息就是添加一个首屏信息，否则就修改它
          setHomeInfo({});
          setHomeEmpty(true)
        }
      }
    })()
    return () => {
      audio.pause();
    }
  }, [])

  // 图片上传
  const uploadButton = (
    <div className={styles.uploadBtn}>
      {loading ?
        <LoadingOutlined /> :
        <div>
          <PlusOutlined />
          <p>上传封面</p>
        </div>
      }
    </div>
  );
  const [loading, setLoading] = useState(false)
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 0) {
        setHomeInfo({
          ...homeInfo,
          bgImg: info.file.response.data
        })
        message.success('上传成功')
      } else {
        message.error('上传失败')
      }
      setLoading(false);
    }
  }

  const audioHandleChange = info => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 0) {
        setHomeInfo({
          ...homeInfo,
          bgm: info.file.response.data
        })
        audio.src = info.file.response.data;
        message.success('上传成功')
        setPaused(audio.paused);
      } else {
        message.error('上传失败')
      }
    }
  }

  return (
    <div>
      {/* 封面上传 */}
      <Col className={styles.col}>
        <Upload
          name="file"
          showUploadList={false}
          className={styles.upload}
          action="/api/upload"
          onChange={handleChange}
        >
          {homeInfo.bgImg ? <img src={homeInfo.bgImg} alt="" /> : uploadButton}
        </Upload>
      </Col>

      <Col md={15} sm={20} className={styles.col}>
        <TextArea rows={4} placeholder="描述" value={homeInfo.description} onChange={e => {
          setHomeInfo({
            ...homeInfo,
            description: e.target.value
          })
        }} />
      </Col>

      <Col md={15} sm={20} className={styles.col}  >
        <Input placeholder="备案号" value={homeInfo.icp} onChange={e => {
          setHomeInfo({
            ...homeInfo,
            icp: e.target.value
          })
        }} />
      </Col>

      <Col md={15} sm={20} className={styles.col} >
        {paused ?
          <Button
            onClick={() => {
              audio.play();
              setPaused(audio.paused);
            }}
          >播放</Button> :
          <Button
            onClick={() => {
              audio.pause();
              setPaused(audio.paused);
            }}
          >暂停</Button>
        }
        <Upload
          name="file"
          showUploadList={false}
          action="/api/upload"
          onChange={audioHandleChange}
        >
          <Button>上传BGM</Button>
        </Upload>


      </Col>

      <Col md={15} sm={20} className={styles.col}  >
        {
          homeEmpty ? <Button onClick={async () => {
            const res = await addHome(homeInfo)
            if (res.code === 0) {
              message.success('添加成功')
            } else {
              message.error("添加失败")
            }
          }}>
            添加
          </Button> : <Button onClick={async () => {
              const res = await updateHome(homeInfo)
              if (res.code === 0) {
                message.success('修改成功')
              } else {
                message.error("修改失败")
              }
            }}>
              修改
        </Button>
        }
      </Col>
    </div>
  );
}
Home.title = "首页"
export default Home;
