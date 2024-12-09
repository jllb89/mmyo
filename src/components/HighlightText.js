import React from 'react';
import styles from './HighlightText.module.css'; // Make sure to have a .highlight class here or reuse the same CSS used in Home

export default function HighlightText({ text, phrases }) {
  // Escaping special characters in phrases for safe regex usage
  const escapedPhrases = phrases.map(phrase =>
    phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  );

  const paragraphBreakPlaceholder = '###PARAGRAPH_BREAK###';
  const lineBreakPlaceholder = '###LINE_BREAK###';

  // Replace line breaks with placeholders
  const textWithPlaceholders = text
    .replace(/\n\n/g, paragraphBreakPlaceholder)
    .replace(/\n/g, lineBreakPlaceholder);

  const regex = new RegExp(
    `(${escapedPhrases.join('|')}|${paragraphBreakPlaceholder}|${lineBreakPlaceholder})`,
    'g'
  );

  const parts = textWithPlaceholders.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (phrases.includes(part)) {
          return (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          );
        } else if (part === paragraphBreakPlaceholder) {
          return (
            <React.Fragment key={index}>
              <br />
              <br />
            </React.Fragment>
          );
        } else if (part === lineBreakPlaceholder) {
          return <br key={index} />;
        } else {
          return <React.Fragment key={index}>{part}</React.Fragment>;
        }
      })}
    </>
  );
}
