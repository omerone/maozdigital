'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FALLBACK_CONTENT } from '@/lib/content';
import { useAdmin } from './AdminContext';

type ContentMap = Record<string, string>;
const isFallbackKey = (value: string): value is keyof typeof FALLBACK_CONTENT =>
  value in FALLBACK_CONTENT;

interface ContentContextValue {
  content: ContentMap;
  isLoading: boolean;
  savingIds: Set<string>;
  getValue: (id: string, fallback?: string) => string;
  updateValue: (id: string, value: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextValue>({
  content: FALLBACK_CONTENT,
  isLoading: true,
  savingIds: new Set(),
  getValue: (id: string, fallback?: string) => fallback ?? '',
  updateValue: async () => {},
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAdmin();
  const [content, setContent] = useState<ContentMap>(FALLBACK_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed fetching content');
        }
        const data = await response.json();
        if (data && typeof data === 'object' && typeof data.content === 'object' && data.content !== null) {
          setContent({ ...FALLBACK_CONTENT, ...(data.content as ContentMap) });
        } else {
          setContent(FALLBACK_CONTENT);
        }
      } catch (error) {
        console.error('Failed loading editable content:', error);
        setContent(FALLBACK_CONTENT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const getValue = useCallback((id: string, fallback?: string) => {
    const current = contentRef.current[id];
    if (typeof current === 'string') {
      return current;
    }
    if (typeof fallback === 'string') {
      return fallback;
    }
    if (isFallbackKey(id)) {
      return FALLBACK_CONTENT[id];
    }
    return '';
  }, []);

  const updateValue = useCallback(
    async (id: string, value: string) => {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      try {
        const response = await fetch('/api/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ updates: [{ id, value }] }),
        });

        if (!response.ok) {
          throw new Error('Failed saving content');
        }

        setContent((prev) => ({
          ...prev,
          [id]: value,
        }));
      } catch (error) {
        console.error('Failed saving content:', error);
        if (isAdmin) {
          alert('שמירת התוכן נכשלה. נסה שוב.');
        }
        throw error;
      } finally {
        setSavingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [isAdmin]
  );

  const contextValue = useMemo(
    () => ({
      content,
      isLoading,
      savingIds,
      getValue,
      updateValue,
    }),
    [content, getValue, isLoading, savingIds, updateValue]
  );

  return <ContentContext.Provider value={contextValue}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);

export const useContentValue = (id: string, fallback: string) => {
  const { getValue } = useContent();
  return getValue(id, fallback);
};

export const useEditableString = (id: string, fallback: string, promptLabel = 'ערוך טקסט') => {
  const { getValue, updateValue } = useContent();
  const { isAdmin } = useAdmin();
  const value = getValue(id, fallback);

  const handleEdit = useCallback(async () => {
    if (!isAdmin) {
      return;
    }

    const nextValue = window.prompt(promptLabel, value);
    if (nextValue === null) {
      return;
    }
    if (!nextValue.trim()) {
      alert('אי אפשר לשמור טקסט ריק.');
      return;
    }

    await updateValue(id, nextValue);
  }, [id, isAdmin, promptLabel, updateValue, value]);

  return {
    value,
    edit: handleEdit,
    isAdmin,
  };
};

