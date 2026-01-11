import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules?: any;
  formats?: string[];
  placeholder?: string;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  modules,
  formats,
  placeholder,
  className = '',
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default QuillEditor;

