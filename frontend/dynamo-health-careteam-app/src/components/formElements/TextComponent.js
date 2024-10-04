import React from 'react';

export default function TextComponent({text}) {
  return (
    <div
      style={{
        fontWeight: 700,
        fontSize: '18px',
        textAlign: 'left',
        width: '450px',
      }}>
      {text}
    </div>
  );
}
