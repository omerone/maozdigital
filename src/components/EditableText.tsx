'use client';

import { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { useAdmin } from '@/contexts/AdminContext';
import { FALLBACK_CONTENT } from '@/lib/content';

type ElementTag = keyof React.JSX.IntrinsicElements;

interface EditableTextProps<T extends ElementTag = 'span'> {
  id: keyof typeof FALLBACK_CONTENT | string;
  as?: T;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  promptLabel?: string;
  allowEmpty?: boolean;
  displayValue?: string;
}

export default function EditableText<T extends ElementTag = 'span'>({
  id,
  as,
  defaultValue,
  className,
  disabled = false,
  promptLabel = 'ערוך טקסט',
  allowEmpty = false,
  displayValue,
  ...rest
}: EditableTextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, 'className' | 'children'>) {
  const Component = (as || 'span') as ElementTag;
  const { getValue, updateValue, savingIds } = useContent();
  const { isAdmin } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);

  const fallback = defaultValue ?? FALLBACK_CONTENT[id as keyof typeof FALLBACK_CONTENT] ?? '';
  const storedValue = getValue(id, fallback);
  const isSavingThisId = isSaving || savingIds.has(id);
  const displayContent = displayValue ?? storedValue;

  const elementProps = rest as React.ComponentPropsWithoutRef<T>;
  const elementTitle =
    'title' in elementProps ? (elementProps.title as string | undefined) : undefined;
  const elementOnDoubleClick =
    'onDoubleClick' in elementProps
      ? (elementProps.onDoubleClick as React.MouseEventHandler<Element>)
      : undefined;

  const isEditable = isAdmin && !disabled;

  const handleEdit = async () => {
    if (!isEditable) {
      return;
    }

    const nextValue = window.prompt(promptLabel, storedValue);
    if (nextValue === null) {
      return;
    }

    const trimmed = nextValue.trim();
    if (!allowEmpty && trimmed.length === 0) {
      alert('אי אפשר לשמור טקסט ריק.');
      return;
    }

    if (trimmed === storedValue.trim()) {
      return;
    }

    try {
      setIsSaving(true);
      await updateValue(id, nextValue);
    } finally {
      setIsSaving(false);
    }
  };

  const combinedClassName = [
    className,
    'relative inline-block',
    isEditable ? 'group pr-8 transition-colors hover:bg-[#f3f1eb]' : '',
    isSavingThisId ? 'opacity-60' : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <Component
      {...(elementProps as Record<string, unknown>)}
      className={combinedClassName || undefined}
      data-editable="true"
      title={isEditable ? 'ערוך תוכן' : elementTitle}
      onDoubleClick={(event: React.MouseEvent) => {
        if (isEditable) {
          event.preventDefault();
          event.stopPropagation();
          handleEdit();
        }
        if (typeof elementOnDoubleClick === 'function') {
          elementOnDoubleClick(event);
        }
      }}
    >
      <span className="inline-block align-middle">{displayContent}</span>
      {isEditable && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleEdit();
          }}
          className="absolute top-1 right-1 flex items-center justify-center rounded-full border border-[#d4a65a] bg-white px-2 py-1 text-[11px] font-medium text-[#1e1f24] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          style={{ minWidth: '48px', minHeight: '28px' }}
          aria-label="עריכת תוכן"
        >
          עריכה
        </button>
      )}
      {isAdmin && isSavingThisId && <span className="sr-only">שומר...</span>}
    </Component>
  );
}

