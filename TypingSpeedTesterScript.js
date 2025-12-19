 const promptTexts = [
        "Learning to type quickly and accurately is a valuable skill in the digital age. With consistent practice, you can improve your typing speed and accuracy over time. Stay focused and motivated as you type this text. Mastery takes time but brings many benefits.",
        "The quick brown fox jumps over the lazy dog. This sentence is a classic example of a pangram, a phrase that contains every letter of the alphabet at least once.",
        "Technology is rapidly evolving, changing the way we work, communicate, and live. Staying updated with these changes is essential for personal and professional growth."
    ];

    const highlightedPrompt = document.getElementById('highlighted-prompt');
    const typingArea = document.getElementById('typing-area');
    const resultSection = document.getElementById('result-section');
    const typingTestSection = document.getElementById('typing-test-section');
    const timeTakenDisplay = document.getElementById('time-taken');
    const wpmResultDisplay = document.getElementById('wpm-result');
    const accuracyResultDisplay = document.getElementById('accuracy-result');
    const restartButton = document.getElementById('restart-button');
    const progressBar = document.getElementById('progress-bar');
    const startButton = document.getElementById('start-button');
    const timerDisplay = document.getElementById('timer');
    const startNewTestButton = document.getElementById('start-new-test-button');
    const howItWorksSection = document.getElementById('how-it-works'); // Reference to the "How the Typing Test Works" section
    const aboutSection = document.getElementById('about-section');
    let startTime = null;
    let timerInterval = null;

    // Select a random prompt for the test
    function getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * promptTexts.length);
        return promptTexts[randomIndex];
    }

    // Start the timer
    function startTimer() {
        let seconds = 0;
        let minutes = 0;
        timerInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            timerDisplay.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 1000);
    }

    // Function to escape HTML special characters
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Highlight the text as the user types
    function highlightText() {
        const typedText = typingArea.value;
        let highlightedText = '';
        let correctChars = 0;

        for (let i = 0; i < highlightedPrompt.innerText.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === highlightedPrompt.innerText[i]) {
                    highlightedText += `<span class="correct">${escapeHTML(highlightedPrompt.innerText[i])}</span>`;
                    correctChars++;
                } else {
                    highlightedText += `<span class="incorrect">${escapeHTML(highlightedPrompt.innerText[i])}</span>`;
                }
            } else {
                highlightedText += escapeHTML(highlightedPrompt.innerText[i]);
            }
        }

        highlightedPrompt.innerHTML = highlightedText;

        const progress = (correctChars / highlightedPrompt.innerText.length) * 100;
        progressBar.style.width = progress + '%';

        const accuracy = Math.round((correctChars / typedText.length) * 100);
        accuracyResultDisplay.innerText = `Accuracy: ${accuracy}%`;
    }

    // Calculate WPM
    function calculateWPM() {
        const typedText = typingArea.value;
        const minutes = (Date.now() - startTime) / 60000;
        const wpm = Math.round((typedText.length / 5) / minutes);
        wpmResultDisplay.innerText = `WPM: ${wpm}`;
    }

    // End the test
    function endTest() {
        stopTimer();
        timeTakenDisplay.innerText = `Typing Time: ${timerDisplay.innerText}`;
        resultSection.style.display = 'block';
        typingTestSection.style.display = 'none';
    }

    function startNewTest() {
        // Reset timer and hide results
        stopTimer();
        resultSection.style.display = 'none';
        typingTestSection.style.display = 'block';

        typingArea.value = '';
        highlightedPrompt.innerText = getRandomPrompt();
        progressBar.style.width = '0%';

        startTime = Date.now();
        startTimer();
        typingArea.disabled = false;
        typingArea.focus();
    }

    startButton.addEventListener('click', () => {
        // Hide the "How the Typing Test Works" section
         aboutSection.style.display = 'none';  
      howItWorksSection.style.display = 'none';
   

        typingTestSection.style.display = 'block';
        startButton.style.display = 'none';
        startNewTest();
    });

    typingArea.addEventListener('input', () => {
        highlightText();
        calculateWPM();
        if (typingArea.value === highlightedPrompt.innerText) {
            endTest();
        }
    });

    restartButton.addEventListener('click', () => {
        startNewTest();
    });

    startNewTestButton.addEventListener('click', () => {
        startNewTest();
    });

    typingArea.addEventListener('input', () => {
        highlightText();
        calculateWPM();
        // Check if the number of characters typed matches the prompt length
        if (typingArea.value.length === highlightedPrompt.innerText.length) {
            endTest();
        }
    });
