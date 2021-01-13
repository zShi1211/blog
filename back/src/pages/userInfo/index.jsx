import React, { useState } from 'react'
import { Upload, message, Input, Button, } from 'antd';
import { connect } from 'umi'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less'
function index({ loginInfo, updataInfo }) {
  // 头像上传
  const { info } = loginInfo
  const [imageUrl, setImageUrl] = useState(info.avatar)
  const [loading, setLoading] = useState(false)
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.data)
      setLoading(false);
    }
  };
  const uploadButton = (
    <div className={styles.upload}>
      {loading ?
        <LoadingOutlined /> :
        <div>
          <PlusOutlined />
          <p>更换头像</p>
        </div>
      }
    </div>
  );

  // 表单
  const [loginId, setloginId] = useState(info.loginId)
  const [nickName, setNickName] = useState(info.nickName)

  return (
    <div className={styles.wrapper}>
      <Upload
        name="file"
        action="/api/upload"
        className={styles.avatarUploader}
        onChange={handleChange}
        showUploadList={false}
      >
        <img src={imageUrl} alt="avatar" />
        {uploadButton}
      </Upload>

      <div className={styles.form}>
        <Input addonBefore="账号:" placeholder="用户名" value={loginId} onChange={e => {
          setloginId(e.target.value)
        }} className={styles.input} />
        <Input addonBefore="昵称:" placeholder="昵称" value={nickName} onChange={e => {
          setNickName(e.target.value)
        }} className={styles.input} />
        <Button type="primary" onClick={async () => {
          console.log(loginId, nickName, imageUrl)
          const res = await updataInfo(loginId, nickName, imageUrl)
          if (res) {
            message.success('修改成功')
          } else {
            message.error('修改失败')
          }
        }}  >
          修改
      </Button>
      </div>
    </div>
  )
}

const mapState2Props = state => {
  return {
    loginInfo: state.login
  }
}

const mapDispatch2Props = dispatch => {
  return {
    updataInfo(loginId, nickName, avatar) {
      return dispatch({
        type: 'login/updateInfo', payload: {
          loginId,
          nickName,
          avatar
        }
      })
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(index)
