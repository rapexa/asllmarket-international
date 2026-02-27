import { useState, useEffect, useRef } from 'react';

const DEFAULT_TYPE_MS = 80;
const DEFAULT_DELETE_MS = 50;
const DEFAULT_PAUSE_AFTER = 2000;
const DEFAULT_PAUSE_BEFORE = 600;

/**
 * Placeholder با افکت تایپینگ: عبارت‌ها یکی‌یکی تایپ می‌شوند، پاک می‌شوند و بعدی شروع می‌شود.
 */
export function useTypingPlaceholder(
  phrases: string[],
  options?: {
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseAfter?: number;
    pauseBefore?: number;
    cursor?: string;
  }
): string {
  const {
    typeSpeed = DEFAULT_TYPE_MS,
    deleteSpeed = DEFAULT_DELETE_MS,
    pauseAfter = DEFAULT_PAUSE_AFTER,
    pauseBefore = DEFAULT_PAUSE_BEFORE,
    cursor = '|',
  } = options ?? {};

  const [display, setDisplay] = useState('');
  const phraseIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const displayRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phrasesRef = useRef(phrases);
  phrasesRef.current = phrases;
  displayRef.current = display;

  useEffect(() => {
    if (!phrases.length) return;

    const run = () => {
      const list = phrasesRef.current;
      const idx = phraseIndexRef.current % list.length;
      const phrase = list[idx] ?? '';
      const current = displayRef.current;

      if (isDeletingRef.current) {
        if (current.length === 0) {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % list.length;
          timeoutRef.current = setTimeout(run, pauseBefore);
          return;
        }
        const next = current.slice(0, -1);
        displayRef.current = next;
        setDisplay(next);
        timeoutRef.current = setTimeout(run, deleteSpeed);
        return;
      }

      if (current.length >= phrase.length) {
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(run, deleteSpeed);
        }, pauseAfter);
        return;
      }

      const next = phrase.slice(0, current.length + 1);
      displayRef.current = next;
      setDisplay(next);
      timeoutRef.current = setTimeout(run, typeSpeed);
    };

    phraseIndexRef.current = 0;
    isDeletingRef.current = false;
    setDisplay('');
    timeoutRef.current = setTimeout(run, typeSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases.join('|'), typeSpeed, deleteSpeed, pauseAfter, pauseBefore]);

  return display + cursor;
}
