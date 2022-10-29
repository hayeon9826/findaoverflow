/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/build/jodit.css';

export default function TextEditor({
  placeholder = '',
  setMarkDown = null,
  body = '',
}) {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: body ? true : false, // all options from https://xdsoft.net/jodit/docs/classes/config.Config.html
    placeholder: placeholder || '내용을 입력해 주세요...',
    style: body ? {} : { height: '500px' },
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={body || content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          setContent(newContent);
          setMarkDown && setMarkDown(newContent);
        }} // preferred to use only this option to update the content for performance reasons
      />
    </>
  );
}
