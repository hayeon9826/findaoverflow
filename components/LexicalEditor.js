/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import ExampleTheme from './themes/ExampleTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';
import { mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import {
  faRotateRight,
  faRotateLeft,
  faAlignJustify,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faUnderline,
  faItalic,
  faStrikethrough,
  faBold,
} from '@fortawesome/free-solid-svg-icons';

function Placeholder() {
  return <div className="editor-placeholder">내용을 입력해주세요...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // editable: true,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor({ setMarkDown }) {
  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, '#######STATE');

      setMarkDown(root?.__cachedText);
    });
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <Toolbar />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <OnChangePlugin onChange={onChange} />
          <AutoFocusPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  return (
    <div className="fixed bottom-12 left-1/2 z-20 mb-4 flex h-10 -translate-x-1/2 transform items-center space-x-2 bg-[#1b2733] px-2 py-2 shadow">
      <button
        className={clsx(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isBold ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      >
        <FontAwesomeIcon icon={faBold} className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={clsx(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isStrikethrough ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      >
        <FontAwesomeIcon
          icon={faStrikethrough}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
      <button
        className={clsx(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isItalic ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      >
        <FontAwesomeIcon icon={faItalic} className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={clsx(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isUnderline ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      >
        <FontAwesomeIcon
          icon={faUnderline}
          className="h-3.5 w-3.5 text-white"
        />
      </button>

      <span className="block h-full w-[1px] bg-gray-600"></span>

      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignLeft}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignCenter}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignRight}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <FontAwesomeIcon
          icon={faAlignJustify}
          className="h-3.5 w-3.5 text-white"
        />
      </button>

      <span className="block h-full w-[1px] bg-gray-600"></span>

      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
      >
        <FontAwesomeIcon
          icon={faRotateLeft}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
      <button
        className={clsx(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
      >
        <FontAwesomeIcon
          icon={faRotateRight}
          className="h-3.5 w-3.5 text-white"
        />
      </button>
    </div>
  );
};
