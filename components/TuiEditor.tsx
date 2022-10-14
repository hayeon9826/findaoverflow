import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>; // type 찾아봐야함
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
  const router = useRouter();
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  const showContent = useCallback(() => {
    const editorIns = editorRef?.current?.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMark = editorIns.getMarkdown();
    console.log(contentHtml);
    console.log(contentMark);
  }, [editorRef]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || '내용을 입력해주세요..'} // 글 수정 시 사용
          initialEditType="markdown" // wysiwyg & markdown
          previewStyle="vertical"
          hideModeSwitch={true}
          height="calc(100% - 3rem)"
          theme={''} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
      <div className="flex h-12">
        <button
          className="h-full w-[40%] bg-gray-500 text-sm font-medium text-white hover:bg-gray-700"
          onClick={handleGoBack}
        >
          뒤로가기
        </button>
        <button
          className="h-full w-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
          onClick={showContent}
        >
          작성하기
        </button>
      </div>
    </>
  );
};

export default TuiEditor;
