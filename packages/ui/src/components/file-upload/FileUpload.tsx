import * as React from "react";
import { forwardRef, useCallback, useEffect, useId, useMemo, useRef } from "react";
import { createContextScope, Scope } from "@src/hooks/useCreateContext";
import { useControllableState } from "@src/hooks/useControllableState";
import { useComposedRefs } from "@src/hooks/useComposeRefs";
import { Button, ButtonProps } from "../button/Button";
import { composeEventHandlers } from "@src/utils/composeEventHandlers";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Image, ImageRootProps } from "../image/Image";

/* -------------------------------------------------------------------------------------------------
 * Types & Constants
 * -----------------------------------------------------------------------------------------------*/

type ErrorCode = "file-too-large" | "file-invalid-type" | "too-many-files" | "duplicate-file";

interface FileRejection {
  file: File;
  errors: { code: ErrorCode; message: string }[];
}

type ByteStandard = "si" | "iec";
type FileSizeUnit = "Byte" | "KB" | "MB" | "GB" | "TB";

interface MaxSizeOptions {
  value: number;
  unit: FileSizeUnit;
  standard?: ByteStandard;
}

type MaxSizeProp = number | MaxSizeOptions;

const BUILT_IN_MESSAGES: Record<ErrorCode, string> = {
  "file-too-large": "파일 크기가 허용된 최대 크기를 초과했습니다.",
  "file-invalid-type": "허용되지 않는 파일 형식입니다.",
  "too-many-files": "최대 업로드 가능한 파일 개수를 초과했습니다.",
  "duplicate-file": "이미 동일한 파일이 존재합니다.",
};

const FILE_UPLOAD_NAME = "FileUpload";

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------------------------*/

const UNIT_MULTIPLIERS: Record<ByteStandard, Record<FileSizeUnit, number>> = {
  iec: {
    Byte: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  },
  si: {
    Byte: 1,
    KB: 1000,
    MB: 1000 ** 2,
    GB: 1000 ** 3,
    TB: 1000 ** 4,
  },
};

function getMaxSizeInBytes(maxSize: MaxSizeProp): number {
  if (typeof maxSize === "number") {
    return maxSize;
  }
  const { value, unit, standard = "iec" } = maxSize;
  return value * UNIT_MULTIPLIERS[standard][unit];
}

function formatFileSize(bytes: number, decimals: number = 2, standard: ByteStandard = "iec"): string {
  if (bytes === 0) return "0 Byte";

  const base = standard === "iec" ? 1024 : 1000;
  const units: FileSizeUnit[] = ["Byte", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  const clampedIndex = Math.min(unitIndex, units.length - 1);

  const value = bytes / Math.pow(base, clampedIndex);
  return `${value.toFixed(decimals)} ${units[clampedIndex]}`;
}

function isFileDuplicate(file: File, existingFiles: File[]): boolean {
  return existingFiles.some(
    (existingFile) =>
      existingFile.name === file.name &&
      existingFile.size === file.size &&
      existingFile.type === file.type &&
      existingFile.lastModified === file.lastModified,
  );
}

function isAcceptedFileType(file: File, accept?: string): boolean {
  if (!accept) return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim().toLowerCase());

  const fileType = file.type.toLowerCase();
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.startsWith(".")) {
      return fileExtension === acceptedType;
    }
    if (acceptedType.endsWith("/*")) {
      const baseType = acceptedType.replace("/*", "");
      return fileType.startsWith(baseType);
    }
    return fileType === acceptedType;
  });
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const [createFileUploadContext, createFileUploadScope] = createContextScope(FILE_UPLOAD_NAME);

type ScopedProps<P> = P & { __scopeFileUpload?: Scope };

interface FileUploadContextValue {
  files: File[];
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  disabled: boolean;
  accept?: string;
  multiple: boolean;
  maxSize: MaxSizeProp;
  maxFiles: number;
  allowDuplicates: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  openFilePicker: () => void;
  messages: Record<ErrorCode, string>;
  onReject?: (rejections: FileRejection[]) => void;
}

const [FileUploadProvider, useFileUploadContext] = createFileUploadContext<FileUploadContextValue>(FILE_UPLOAD_NAME);

/* -------------------------------------------------------------------------------------------------
 * Item Context
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemContextValue {
  file: File;
  index: number;
}

const [FileUploadItemProvider, useFileUploadItemContext] = createFileUploadContext<FileUploadItemContextValue>(`${FILE_UPLOAD_NAME}Item`);

/* -------------------------------------------------------------------------------------------------
 * FileUpload.Root
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadRootProps {
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  onFileUpload?: (file: File) => void;
  onFileDelete?: (file: File) => void;
  name?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: MaxSizeProp;
  maxFiles?: number;
  setRejectMessage?: Partial<Record<ErrorCode, string>>;
  onReject?: (rejections: FileRejection[]) => void;
  allowDuplicates?: boolean;
  children?: React.ReactNode;
}

const FileUploadRoot = forwardRef<HTMLDivElement, ScopedProps<FileUploadRootProps>>((props, forwardedRef) => {
  const {
    __scopeFileUpload,
    value: controlledValue,
    defaultValue = [],
    onValueChange,
    onFileUpload,
    onFileDelete,
    name,
    accept,
    multiple = true,
    disabled = false,
    maxSize = Infinity,
    maxFiles = Infinity,
    setRejectMessage,
    onReject,
    allowDuplicates = false,
    children,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const messages = useMemo<Record<ErrorCode, string>>(
    () => ({
      ...BUILT_IN_MESSAGES,
      ...setRejectMessage,
    }),
    [setRejectMessage],
  );

  const [files, setFiles] = useControllableState<File[]>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });

  const validateFiles = useCallback(
    (incomingFiles: File[]): { accepted: File[]; rejected: FileRejection[] } => {
      const accepted: File[] = [];
      const rejected: FileRejection[] = [];
      const maxSizeBytes = getMaxSizeInBytes(maxSize);
      const currentCount = files.length;

      incomingFiles.forEach((file, idx) => {
        const errors: { code: ErrorCode; message: string }[] = [];

        // Check file count
        if (currentCount + accepted.length + 1 > maxFiles) {
          errors.push({ code: "too-many-files", message: messages["too-many-files"] });
        }

        // Check file type
        if (!isAcceptedFileType(file, accept)) {
          errors.push({ code: "file-invalid-type", message: messages["file-invalid-type"] });
        }

        // Check file size
        if (file.size > maxSizeBytes) {
          errors.push({ code: "file-too-large", message: messages["file-too-large"] });
        }

        // Check duplicates
        if (!allowDuplicates && (isFileDuplicate(file, files) || isFileDuplicate(file, accepted))) {
          errors.push({ code: "duplicate-file", message: messages["duplicate-file"] });
        }

        if (errors.length > 0) {
          rejected.push({ file, errors });
        } else {
          accepted.push(file);
        }
      });

      return { accepted, rejected };
    },
    [files, maxSize, maxFiles, accept, allowDuplicates, messages],
  );

  const addFiles = useCallback(
    (incomingFiles: File[]) => {
      if (disabled) return;

      const { accepted, rejected } = validateFiles(incomingFiles);

      if (rejected.length > 0) {
        onReject?.(rejected);
      }

      if (accepted.length > 0) {
        const newFiles = multiple ? [...files, ...accepted] : [accepted[0]];
        setFiles(newFiles);
        accepted.forEach((file) => onFileUpload?.(file));
      }
    },
    [disabled, validateFiles, multiple, files, setFiles, onFileUpload, onReject],
  );

  const removeFile = useCallback(
    (index: number) => {
      if (disabled) return;
      const fileToRemove = files[index];
      if (fileToRemove) {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onFileDelete?.(fileToRemove);
      }
    },
    [disabled, files, setFiles, onFileDelete],
  );

  const openFilePicker = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (fileList) {
        addFiles(Array.from(fileList));
      }
      // Reset input value to allow selecting the same file again
      event.target.value = "";
    },
    [addFiles],
  );

  return (
    <FileUploadProvider
      scope={__scopeFileUpload}
      files={files}
      addFiles={addFiles}
      removeFile={removeFile}
      disabled={disabled}
      accept={accept}
      multiple={multiple}
      maxSize={maxSize}
      maxFiles={maxFiles}
      allowDuplicates={allowDuplicates}
      inputRef={inputRef}
      openFilePicker={openFilePicker}
      messages={messages}
      onReject={onReject}
    >
      <div ref={forwardedRef} data-disabled={disabled || undefined}>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
          aria-hidden="true"
          tabIndex={-1}
        />
        {children}
      </div>
    </FileUploadProvider>
  );
});

FileUploadRoot.displayName = `${FILE_UPLOAD_NAME}.Root`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.Trigger
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadTriggerProps extends Omit<ButtonProps, "onClick"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FileUploadTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<FileUploadTriggerProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, onClick, disabled: triggerDisabled, ...triggerProps } = props;
  const context = useFileUploadContext(`${FILE_UPLOAD_NAME}.Trigger`, __scopeFileUpload);
  const [isOpen, setIsOpen] = React.useState(false);

  const disabled = triggerDisabled ?? context.disabled;

  const handleClick = composeEventHandlers(onClick, () => {
    if (!disabled) {
      setIsOpen(true);
      context.openFilePicker();
    }
  });

  // Reset isOpen when input changes (file selected or cancelled)
  useEffect(() => {
    const input = context.inputRef.current;
    if (!input) return;

    const handleFocus = () => {
      // Small delay to allow file dialog to close
      setTimeout(() => setIsOpen(false), 100);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [context.inputRef]);

  return (
    <Button
      ref={forwardedRef}
      type="button"
      disabled={disabled}
      data-disabled={disabled || undefined}
      data-state={isOpen ? "open" : "closed"}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={handleClick}
      {...triggerProps}
    />
  );
});

FileUploadTrigger.displayName = `${FILE_UPLOAD_NAME}.Trigger`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.DropZone
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadDropZoneProps extends PrimitivePropsWithRef<"div"> {
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const FileUploadDropZone = forwardRef<HTMLDivElement, ScopedProps<FileUploadDropZoneProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, onDrop, onDragEnter, onDragLeave, onDragOver, ...dropZoneProps } = props;
  const context = useFileUploadContext(`${FILE_UPLOAD_NAME}.DropZone`, __scopeFileUpload);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const dragCounterRef = useRef(0);

  const handleDragEnter = composeEventHandlers(onDragEnter, (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  });

  const handleDragLeave = composeEventHandlers(onDragLeave, (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragOver(false);
    }
  });

  const handleDragOver = composeEventHandlers(onDragOver, (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  });

  const handleDrop = composeEventHandlers(onDrop, (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounterRef.current = 0;

    if (context.disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      context.addFiles(droppedFiles);
    }
  });

  return (
    <Primitive.div
      ref={forwardedRef}
      data-drag-over={isDragOver || undefined}
      data-disabled={context.disabled || undefined}
      role="button"
      tabIndex={context.disabled ? -1 : 0}
      aria-disabled={context.disabled || undefined}
      aria-label="파일을 드래그하여 업로드"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !context.disabled) {
          e.preventDefault();
          context.openFilePicker();
        }
      }}
      {...dropZoneProps}
    />
  );
});

FileUploadDropZone.displayName = `${FILE_UPLOAD_NAME}.DropZone`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.List
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadListProps extends Omit<PrimitivePropsWithRef<"ul">, "children"> {
  children?: React.ReactNode | ((files: File[]) => React.ReactNode);
}

const FileUploadList = forwardRef<HTMLUListElement, ScopedProps<FileUploadListProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, children, ...listProps } = props;
  const context = useFileUploadContext(`${FILE_UPLOAD_NAME}.List`, __scopeFileUpload);

  const renderedChildren = typeof children === "function" ? children(context.files) : children;

  return (
    <Primitive.ul
      ref={forwardedRef}
      role="list"
      aria-label="업로드된 파일 목록"
      data-disabled={context.disabled || undefined}
      {...listProps}
    >
      {renderedChildren}
    </Primitive.ul>
  );
});

FileUploadList.displayName = `${FILE_UPLOAD_NAME}.List`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.Item
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemProps extends PrimitivePropsWithRef<"li"> {
  file: File;
  index: number;
}

const FileUploadItem = forwardRef<HTMLLIElement, ScopedProps<FileUploadItemProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, file, index, ...itemProps } = props;
  const context = useFileUploadContext(`${FILE_UPLOAD_NAME}.Item`, __scopeFileUpload);

  return (
    <FileUploadItemProvider scope={__scopeFileUpload} file={file} index={index}>
      <Primitive.li
        ref={forwardedRef}
        role="listitem"
        data-disabled={context.disabled || undefined}
        aria-label={`파일: ${file.name}`}
        {...itemProps}
      />
    </FileUploadItemProvider>
  );
});

FileUploadItem.displayName = `${FILE_UPLOAD_NAME}.Item`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.ItemPreview
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemPreviewProps extends Omit<ImageRootProps, "src" | "alt"> {
  width?: number | string;
  height?: number | string;
  fallback?: React.ReactNode;
}

const FileUploadItemPreview = forwardRef<HTMLImageElement, ScopedProps<FileUploadItemPreviewProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, width, height, fallback, style, ...previewProps } = props;
  const itemContext = useFileUploadItemContext(`${FILE_UPLOAD_NAME}.ItemPreview`, __scopeFileUpload);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isImage, setIsImage] = React.useState(false);

  useEffect(() => {
    const file = itemContext.file;
    if (file && file.type.startsWith("image/")) {
      setIsImage(true);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setIsImage(false);
      setPreviewUrl(null);
    }
  }, [itemContext.file]);

  if (!isImage || !previewUrl) {
    return fallback ? <>{fallback}</> : null;
  }

  return  (
    <Image.Root ref={forwardedRef} src={previewUrl} alt={`${itemContext.file.name} 미리보기`} {...previewProps}>
      <Image.View/>
    </Image.Root>
  )
  
});

FileUploadItemPreview.displayName = `${FILE_UPLOAD_NAME}.ItemPreview`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.ItemName
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemNameProps extends PrimitivePropsWithRef<"span"> {}

const FileUploadItemName = forwardRef<HTMLSpanElement, ScopedProps<FileUploadItemNameProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, ...nameProps } = props;
  const itemContext = useFileUploadItemContext(`${FILE_UPLOAD_NAME}.ItemName`, __scopeFileUpload);

  return (
    <Primitive.span ref={forwardedRef} aria-label="파일명" {...nameProps}>
      {itemContext.file.name}
    </Primitive.span>
  );
});

FileUploadItemName.displayName = `${FILE_UPLOAD_NAME}.ItemName`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.ItemSize
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemSizeProps extends PrimitivePropsWithRef<"span"> {
  decimals?: number;
  standard?: ByteStandard;
}

const FileUploadItemSize = forwardRef<HTMLSpanElement, ScopedProps<FileUploadItemSizeProps>>((props, forwardedRef) => {
  const { __scopeFileUpload, decimals = 2, standard = "iec", ...sizeProps } = props;
  const itemContext = useFileUploadItemContext(`${FILE_UPLOAD_NAME}.ItemSize`, __scopeFileUpload);

  const formattedSize = formatFileSize(itemContext.file.size, decimals, standard);

  return (
    <Primitive.span ref={forwardedRef} aria-label="파일 크기" {...sizeProps}>
      {formattedSize}
    </Primitive.span>
  );
});

FileUploadItemSize.displayName = `${FILE_UPLOAD_NAME}.ItemSize`;

/* -------------------------------------------------------------------------------------------------
 * FileUpload.ItemDeleteTrigger
 * -----------------------------------------------------------------------------------------------*/

interface FileUploadItemDeleteTriggerProps extends Omit<ButtonProps, "onClick"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: (file: File) => void;
  stopOnDeletePropagation?: boolean;
}

const FileUploadItemDeleteTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<FileUploadItemDeleteTriggerProps>>(
  (props, forwardedRef) => {
    const { __scopeFileUpload, onClick, onDelete, stopOnDeletePropagation = false, disabled: triggerDisabled, ...deleteProps } = props;
    const context = useFileUploadContext(`${FILE_UPLOAD_NAME}.ItemDeleteTrigger`, __scopeFileUpload);
    const itemContext = useFileUploadItemContext(`${FILE_UPLOAD_NAME}.ItemDeleteTrigger`, __scopeFileUpload);

    const disabled = triggerDisabled ?? context.disabled;

    const handleClick = composeEventHandlers(onClick, () => {
      if (disabled) return;

      onDelete?.(itemContext.file);

      if (!stopOnDeletePropagation) {
        context.removeFile(itemContext.index);
      }
    });

    return (
      <Button
        ref={forwardedRef}
        type="button"
        disabled={disabled}
        data-disabled={disabled || undefined}
        aria-label={`${itemContext.file.name} 파일 삭제`}
        onClick={handleClick}
        {...deleteProps}
      />
    );
  },
);

FileUploadItemDeleteTrigger.displayName = `${FILE_UPLOAD_NAME}.ItemDeleteTrigger`;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const Root = FileUploadRoot;
const Trigger = FileUploadTrigger;
const DropZone = FileUploadDropZone;
const List = FileUploadList;
const Item = FileUploadItem;
const ItemPreview = FileUploadItemPreview;
const ItemName = FileUploadItemName;
const ItemSize = FileUploadItemSize;
const ItemDeleteTrigger = FileUploadItemDeleteTrigger;

const FileUpload = {
  Root,
  Trigger,
  DropZone,
  List,
  Item,
  ItemPreview,
  ItemName,
  ItemSize,
  ItemDeleteTrigger,
};

export default FileUpload;

export {
  createFileUploadScope,
  //
  FileUploadRoot,
  FileUploadTrigger,
  FileUploadDropZone,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemName,
  FileUploadItemSize,
  FileUploadItemDeleteTrigger,
  //
  Root,
  Trigger,
  DropZone,
  List,
  Item,
  ItemPreview,
  ItemName,
  ItemSize,
  ItemDeleteTrigger,
  //
  formatFileSize,
  getMaxSizeInBytes,
};

export type {
  FileUploadRootProps,
  FileUploadTriggerProps,
  FileUploadDropZoneProps,
  FileUploadListProps,
  FileUploadItemProps,
  FileUploadItemPreviewProps,
  FileUploadItemNameProps,
  FileUploadItemSizeProps,
  FileUploadItemDeleteTriggerProps,
  //
  ErrorCode,
  FileRejection,
  ByteStandard,
  FileSizeUnit,
  MaxSizeOptions,
  MaxSizeProp,
};
