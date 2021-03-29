import React from 'react';
import './Tag.scss';

interface TagProps {
  text: string;
  isIncludedTag: boolean;
  handleClick: (key: string, isIncludedTag: boolean) => void;
}

export default function Tag(props: TagProps) {
  return (
    <div className="tag">
      <div className="tag__text">{props.text}</div>
      <button
        type="button"
        className="tag__button"
        onClick={() => props.handleClick(props.text, props.isIncludedTag)}
      >
        &#10008;
      </button>
    </div>
  );
}
