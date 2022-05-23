import { useEffect, useRef } from "react";

function LyricActive({ data, handleScroll }) {
  const lyricRef = useRef()

  useEffect(() => {
    const top = lyricRef.current.getBoundingClientRect().top
    // const height = lyricRef.current.getBoundingClientRect().height
    if (top < 0) return handleScroll(top - 200)
    if (top > 200) {
      handleScroll(top - 200)
    } 
  }, [handleScroll])

  return (
    <li ref={lyricRef} className="lyric active">{data.data}</li>
  );
}

export default LyricActive;
