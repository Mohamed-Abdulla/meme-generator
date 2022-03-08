import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    toptext: "",
    bottomtext: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevmeme) => ({
      ...prevmeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevmeme) => ({
      ...prevmeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="toptext"
          onChange={handleChange}
          value={meme.toptext}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomtext"
          onChange={handleChange}
          value={meme.bottomtext}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.toptext}</h2>
        <h2 className="meme--text bottom">{meme.bottomtext}</h2>
      </div>
    </main>
  );
}
