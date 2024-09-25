import{ useEffect, useRef } from 'react';

const Flower= () => {
  const containerRef = useRef(null); // Reference to the container div

  useEffect(() => {
    // Function to add text with delay
    const appendTitle = () => {
      const titles = 'I LOVE U'.split('');
      let index = 0;

      function appendCharacter() {
        const titleElement = containerRef.current.querySelector('#title');
        if (titleElement && index < titles.length) {
          titleElement.innerHTML += titles[index];
          index++;
          setTimeout(appendCharacter, 100); // 300ms delay
        }
      }

      appendCharacter();
    };

    // Fetch the HTML content
    fetch('/flower.html')
      .then((response) => response.text())
      .then((data) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = data;

          // Simulate the onload behavior
          setTimeout(() => {
            document.body.classList.remove('not-loaded');
            appendTitle();
          }, 1000);
        }
      })
      .catch((error) => console.error('Error fetching HTML:', error));

  }, []);

  return (
    <div ref={containerRef} />
  );
};

export default Flower;
