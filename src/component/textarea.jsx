

import React, { useState, useRef, useEffect } from 'react';

const agentNames = ["Gina Williams", "Jake Williams", "Jamie John", "John Doe", "Jeff Stewart", "Paula M. Keith"];

function TextArea() {
  const [notes, setNotes] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const textareaRef = useRef(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    setNotes(e.target.value);

    if (e.target.value.includes('@')) {
      setShowOptions(true);
      setOptions(agentNames);
      setHighlightedIndex(-1);
    } else {
      setShowOptions(false);
      setSelectedOption(null);
      setHighlightedIndex(-1);
    }
  };

  const handleOptionClick = (option) => {
    setNotes(notes.replace(/@[a-zA-Z\s]*/g, `@${option} `));
    setShowOptions(false);
    setSelectedOption(option);
    setHighlightedIndex(-1);
  };

  const handleOptionKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex < options.length - 1) {
        setHighlightedIndex(highlightedIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlightedIndex > -1) {
        setHighlightedIndex(highlightedIndex - 1);
      }
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      handleOptionClick(options[highlightedIndex]);
    }
  };

  const handleAddNote = () => {
    console.log(`Adding note: ${notes}`);
    setNotes('');
  };

  const handleReset = () => {
    setNotes('');
    setShowOptions(false);
    setSelectedOption(null);
    setHighlightedIndex(-1);
  };

  return (
    <>
    
      <textarea
        ref={textareaRef}
        value={notes}
        onChange={handleInputChange}
        onKeyDown={handleOptionKeyDown}
        placeholder="Enter your note here..."
        style={{ backgroundColor: '#ccc' }}
      >
      
        {selectedOption && (
          <span style={{ fontSize: '1.5em' }}>{selectedOption}</span>
        )}
        
      </textarea>
      
      {showOptions && (
        <ul ref={optionsRef}>
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              style={{ background: highlightedIndex === index ? 'yellow' : 'white'  }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      <br />
      
      <button onClick={handleAddNote}>Add Note</button>

      
      <button onClick={handleReset}>Reset</button>
    </>
    
 );
 }

 export default TextArea;

