import { useEffect, useRef } from "react";

function Lyric({ data, handleScroll, active }) {
  const lyricRef = useRef()

  useEffect(() => {
    const top = lyricRef.current.getBoundingClientRect().top
    // const height = lyricRef.current.getBoundingClientRect().height
    if (top < 0 && handleScroll) return handleScroll(top - 200)
    if (top > 200 && handleScroll) {
      handleScroll(top - 200)
    } 
  }, [handleScroll])


  return (
    <li ref={lyricRef} className={`lyric ${active ? 'active' : ''}`}>{data.data}</li>
  );
}

export default Lyric;
