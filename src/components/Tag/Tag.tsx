import React from 'react';
import './Tag.scss';

interface TagProps {
  text: string;
  handleClick: (key: string) => void;
}

export default function Tag(props: TagProps) {
  return (
    <div className="tag">
      <div className="tag__text">{props.text}</div>
      <button
        type="button"
        className="tag__button"
        onClick={() => props.handleClick(props.text)}
      >
        &#10008;
      </button>
    </div>
  );
}
