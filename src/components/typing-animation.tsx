'use client';

import { useState, useEffect, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps extends HTMLAttributes<HTMLSpanElement> {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 1000,
  className,
  ...props
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  useEffect(() => {
    let ticker: NodeJS.Timeout;

    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingTimeout(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        ticker = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    ticker = setTimeout(handleType, typingTimeout);

    return () => {
      clearTimeout(ticker);
    };
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, delay, typingTimeout]);

  return (
    <span className={cn('relative', className)} {...props}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingAnimation;
