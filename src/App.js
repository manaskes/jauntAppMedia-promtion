import React, { useState, useEffect, useRef } from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
} from 'react-share';

const App = () => {
  const [senderName, setSenderName] = useState('JauntApp Media');
  const [nameInput, setNameInput] = useState('');
  const [shareLink, setShareLink] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get('from');
    if (fromName) {
      const formattedName = fromName.replace(/\+/g, ' ');
      setSenderName(formattedName);
    }

    // No need to unmute the video since we want it to stay muted
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    const capitalized = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setNameInput(capitalized);
  };

  const handleSend = () => {
    if (nameInput.trim() !== '') {
      const encodedName = nameInput.replace(/\s+/g, '+');
      const newLink = `${window.location.origin}?from=${encodedName}`;
      setShareLink(newLink);
      setSenderName(nameInput);
      setNameInput('');
    }
  };

  return (
    <div className="relative flex flex-col justify-end items-center h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        muted // Keep the video muted
      >
        <source src='https://link.storjshare.io/raw/jvmjqhm7htch7gma55rqmcmyjcvq/simplyfy/SimplyfyResources/diwalifinal.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-center bg-transparent p-8 rounded-md z-10 max-w-screen-md mx-auto mb-24">
        <p className="text-xl font-bold text-white">
          <span className="text-3xl font-semibold">From: </span>
          <span className="text-3xl font-semibold text-white">{senderName}</span>
        </p>

        <div className="mt-2 flex justify-center items-center space-x-4">
          <input
            type="text"
            value={nameInput}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="border px-4 py-2 rounded-md text-lg w-64"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white px-6 py-2 text-lg rounded-md shadow-md hover:bg-green-600 transition"
          >
            Go
          </button>
        </div>

        {shareLink && (
          <div className="mt-2">
            <h2 className="text-lg mb-4 font-semibold text-white">
              Share this greeting:
            </h2>
            <div className="flex justify-center space-x-4">
              <WhatsappShareButton url={shareLink} title={`Happy Diwali from ${senderName}`}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <FacebookShareButton url={shareLink} quote={`Happy Diwali from ${senderName}`}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareLink} title={`Happy Diwali from ${senderName}`}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <EmailShareButton
                url={shareLink}
                subject="Happy  Diwali"
                body={`Wishing you a very Happy Diwali from ${senderName}! Check out this greeting:`}
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
