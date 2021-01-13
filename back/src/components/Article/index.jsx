import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import useEditHook from '@/hooks/useEditHook'
import styles from './index.less'
import uploadReq from '@/service/api/upload'
import { Upload, message, Input, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const editOptions = {
  status: ["autosave", "lines", "words", "cursor", {
    className: "keystrokes",
    defaultValue: function (el) {
      this.keystrokes = 0;
      el.innerHTML = "0 Keystrokes";
    },
    onUpdate: function (el) {
      el.innerHTML = ++this.keystrokes + " Keystrokes";
    },
    previewImagesInEditor: true,
  }],
  minHeight: "500px",
  uploadImage: true,
  async imageUploadFunction(file, success, error) {
    const res = await uploadReq(file);
    if (res.code === 0) {
      success(res.data)
    } else {
      error(res.message)
    }
  },
  showIcons: ["table", 'side-by-side'],
  hideIcons: ["guide"],
}

export default function index({ isUpdataArticle = false, articleDetail = {}, addArticleHandle, updataArticleHandle }) {
  // 文章标题
  const [title, seTtitle] = useState(isUpdataArticle ? articleDetail.title : '')

  // 编辑框
  const [editValue, changeEditValue] = useEditHook(isUpdataArticle ? articleDetail.content : '')
  const [md, setMd] = useState();

  // 图片上传
  const [imageUrl, setImageUrl] = useState(isUpdataArticle ? articleDetail.picture : '')
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
        setImageUrl(info.file.response.data)
        message.success('上传成功')
      } else {
        message.error('上传失败')
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 文章标题 */}
      <Input value={title} onChange={e => seTtitle(e.target.value)} className={styles.title} placeholder="标题" />


      {/* 封面上传 */}
      <Upload
        name="file"
        showUploadList={false}
        className={styles.upload}
        action="/api/upload"
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>

      {/* 编辑框 */}
      <SimpleMDE onChange={changeEditValue} value={editValue} options={editOptions} getMdeInstance={instance => {
        setMd(instance);
      }} />

      <Button type="primary" onClick={async () => {
        const wordsDom = document.querySelector('.editor-statusbar .words');
        const content = editValue;
        const contentHtml = md.markdown(editValue);
        const words = + wordsDom.innerText;
        const articleState = {
          content,
          contentHtml,
          words,
          picture: imageUrl,
          title
        }
        if (isUpdataArticle) {
          updataArticleHandle && updataArticleHandle(articleState)
        } else {
          addArticleHandle && addArticleHandle(articleState)
        }
      }}>{isUpdataArticle ? "修改": "提交"}</Button>
    </div>
  )
}


