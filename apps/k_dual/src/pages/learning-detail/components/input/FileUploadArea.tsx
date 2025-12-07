import { CloudUpload } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
}

const FileUploadArea = ({ onFileSelect }: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-500">과제 및 첨부파일</label>
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      <div
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          isDragging
            ? "border-teal-600 bg-teal-50"
            : "border-gray-200 bg-gray-50 hover:border-teal-600 hover:bg-teal-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <CloudUpload className="mx-auto mb-2 text-gray-400" size={24} />
        <div className="text-sm text-gray-500">
          여기로 파일을 드래그하거나 클릭하여 업로드하세요
        </div>
        <div className="mt-3 inline-block rounded-md border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-900">
          파일 찾기
        </div>
      </div>
    </div>
  );
};

export default FileUploadArea;
