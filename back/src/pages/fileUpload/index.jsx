import React, { useState } from 'react'
import { Upload, message, Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less'

export default function index() {
  const [fileUrl, setFileUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 0) {
        setFileUrl(info.file.response.data)
        message.success('上传成功')
      } else {
        message.error('上传失败')
      }
      setLoading(false);
    }
  };
  const uploadButton = (
    <div >
      {loading ?
        <LoadingOutlined /> :
        <div>
          <PlusOutlined />
          <p>上传文件</p>
        </div>
      }
    </div>
  );
  return (
    <div>
      <Upload
        name="file"
        showUploadList={false}
        className={styles.upload}
        action="/api/upload"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Input className={styles.input} value={fileUrl} />
    </div>
  )
}
