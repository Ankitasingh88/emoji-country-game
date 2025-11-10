import { useState, useEffect } from 'react';

export default function EmojiCountryGame() {
  // Game data: array of countries with emoji clues and multiple choice options
  const countries = [
    { emojis: '🗼🥐🍷', answer: 'France', options: ['France', 'Italy', 'Spain', 'Belgium'] },
    { emojis: '🍕🍝🏛️', answer: 'Italy', options: ['Greece', 'Italy', 'Spain', 'Portugal'] },
    { emojis: '🗽🍔🦅', answer: 'USA', options: ['USA', 'Canada', 'Mexico', 'UK'] },
    { emojis: '🍣🗻⛩️', answer: 'Japan', options: ['China', 'Japan', 'South Korea', 'Thailand'] },
    { emojis: '🦘🏖️🐨', answer: 'Australia', options: ['Australia', 'New Zealand', 'Fiji', 'Indonesia'] },
    { emojis: '🌮🌵🎺', answer: 'Mexico', options: ['Spain', 'Mexico', 'Argentina', 'Colombia'] },
    { emojis: '🏔️🧀⌚', answer: 'Switzerland', options: ['Austria', 'Switzerland', 'Norway', 'Sweden'] },
    { emojis: '🕌🐪🌴', answer: 'Egypt', options: ['Egypt', 'Morocco', 'Turkey', 'Jordan'] },
    { emojis: '🍁🏒🦫', answer: 'Canada', options: ['USA', 'Canada', 'Norway', 'Finland'] },
    { emojis: '☕🌷🚲', answer: 'Netherlands', options: ['Belgium', 'Netherlands', 'Denmark', 'Germany'] },
    { emojis: '🐼🥡🏮', answer: 'China', options: ['China', 'Japan', 'Vietnam', 'Thailand'] },
    { emojis: '⚽🥘💃', answer: 'Spain', options: ['Spain', 'Portugal', 'Mexico', 'Argentina'] },
    { emojis: '🍺🥨🏰', answer: 'Germany', options: ['Germany', 'Austria', 'Czech Republic', 'Poland'] },
    { emojis: '☕🦙⛰️', answer: 'Peru', options: ['Peru', 'Bolivia', 'Ecuador', 'Colombia'] },
    { emojis: '🦁🐘🌍', answer: 'Kenya', options: ['Kenya', 'Tanzania', 'South Africa', 'Uganda'] },
    { emojis: '🎅❄️🦌', answer: 'Finland', options: ['Finland', 'Norway', 'Sweden', 'Iceland'] },
    { emojis: '🐉🌸🥟', answer: 'South Korea', options: ['South Korea', 'Japan', 'China', 'Taiwan'] },
    { emojis: '🥖🧀🍇', answer: 'France', options: ['France', 'Switzerland', 'Belgium', 'Italy'] },
    { emojis: '🏖️🥥🦜', answer: 'Brazil', options: ['Brazil', 'Colombia', 'Venezuela', 'Argentina'] },
    { emojis: '🐯🕉️🍛', answer: 'India', options: ['India', 'Pakistan', 'Bangladesh', 'Nepal'] }
  ];

  // State management using React hooks
  // WHY: We need to track game progress and update the UI reactively
  const [gameScreen, setGameScreen] = useState('welcome'); // Track current screen: welcome, playing, exit, gameOver
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track which question we're on
  const [score, setScore] = useState(0); // Track correct answers
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Track user's selection
  const [showFeedback, setShowFeedback] = useState(false); // Show if answer is correct/wrong
  const [shuffledCountries, setShuffledCountries] = useState([]); // Randomized questions

  // useEffect runs when component first loads
  // WHY: We want to shuffle questions once at the start for variety
  useEffect(() => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    setShuffledCountries(shuffled);
  }, []);

  // Function to handle when user clicks an answer
  // WHY: We need to check if answer is correct and update score
  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    // If answer is correct, increment score
    if (option === shuffledCountries[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  // Function to move to next question
  // WHY: After seeing feedback, user needs to progress through game
  const handleNext = () => {
    if (currentQuestion + 1 < shuffledCountries.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      setGameScreen('gameOver');
    }
  };

  // Function to go back to previous question
  // WHY: Allow user to review previous questions
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    }
  };

  // Function to start the game
  // WHY: Transition from welcome screen to game screen
  const handlePlay = () => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    setShuffledCountries(shuffled);
    setGameScreen('playing');
  };

  // Function to show exit confirmation
  // WHY: Ask user if they really want to leave
  const handleExitClick = () => {
    setGameScreen('exit');
  };

  // Function to cancel exit and return to game
  // WHY: Let user stay in the game if they change their mind
  const handleCancelExit = () => {
    if (shuffledCountries.length > 0) {
      setGameScreen('playing');
    } else {
      setGameScreen('welcome');
    }
  };

  // Function to confirm exit and return to welcome
  // WHY: Reset everything and go back to start
  const handleConfirmExit = () => {
    setGameScreen('welcome');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setShuffledCountries([]);
  };

  // Function to restart game
  // WHY: Allow user to play again without refreshing page
  const handleRestart = () => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    setShuffledCountries(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setGameScreen('playing');
  };

  const currentCountry = shuffledCountries.length > 0 ? shuffledCountries[currentQuestion] : null;

  // Welcome Screen
  // WHY: Show instructions and welcome message before starting game
  if (gameScreen === 'welcome') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          {/* Welcome heading */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-4 mb-6 text-center shadow-lg">
            <h1 className="text-4xl font-bold text-white tracking-wide">🌍 GUESS COUNTRY 🌎</h1>
          </div>

          {/* Welcome message */}
          <div className="text-center mb-8">
            <p className="text-6xl mb-4">🎮</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Test your geography knowledge by guessing countries based on emoji clues!
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📋 How to Play:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-3">1️⃣</span>
                <span>Look at the emoji clues that represent a country</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">2️⃣</span>
                <span>Choose the correct country from 4 options</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">3️⃣</span>
                <span>Get instant feedback on your answer</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">4️⃣</span>
                <span>Use Back and Next buttons to navigate</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">5️⃣</span>
                <span>Complete all 20 questions to see your score!</span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePlay}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl text-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg transform hover:scale-105"
            >
              ▶️ Play Game
            </button>
            <button
              onClick={handleExitClick}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl text-xl font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-lg transform hover:scale-105"
            >
              🚪 Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exit Confirmation Screen
  // WHY: Confirm if user really wants to leave with a sad emoji
  if (gameScreen === 'exit') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <p className="text-8xl mb-6">😢</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why are you leaving?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Are you sure you want to exit the game?
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleCancelExit}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            >
              ↩️ Go Back
            </button>
            <button
              onClick={handleConfirmExit}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl text-lg font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
            >
              ✔️ Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  // WHY: Show final score and option to play again
  if (gameScreen === 'gameOver') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Game Over!</h1>
          <p className="text-6xl mb-4">🏆</p>
          <p className="text-2xl text-gray-700 mb-2">Your Score</p>
          <p className="text-5xl font-bold text-purple-600 mb-6">
            {score} / {shuffledCountries.length}
          </p>
          <p className="text-xl text-gray-600 mb-8">
            {score === shuffledCountries.length ? 'Perfect! You are a geography master! 🌟' :
             score >= shuffledCountries.length * 0.7 ? 'Great job! Well done! 👏' :
             score >= shuffledCountries.length * 0.5 ? 'Good effort! Keep practicing! 💪' :
             'Nice try! Play again to improve! 🎯'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              🔄 Play Again
            </button>
            <button
              onClick={handleExitClick}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
            >
              🚪 Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  // WHY: Display current question, options, and score
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Main heading box */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-4 mb-6 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-white tracking-wide">GUESS COUNTRY</h1>
        </div>
        
        {/* Header with score and progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            Question {currentQuestion + 1} / {shuffledCountries.length}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-purple-600">
              Score: {score}
            </div>
            <button
              onClick={handleExitClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors shadow"
            >
              🚪 Exit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {/* WHY: Visual indicator of how far through the game they are */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / shuffledCountries.length) * 100}%` }}
          ></div>
        </div>

        {/* Question: Display emojis */}
        {/* WHY: Large, prominent display so user can clearly see the clue */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Guess the Country!</h2>
          <div className="text-8xl mb-6">{currentCountry.emojis}</div>
        </div>

        {/* Answer options */}
        {/* WHY: Multiple choice buttons for easy interaction */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentCountry.options.map((option, index) => {
            // Determine button styling based on selection and feedback
            let buttonClass = "p-4 rounded-xl text-lg font-semibold transition-all border-2 ";
            
            if (showFeedback) {
              // After answering, show correct answer in green, wrong in red
              if (option === currentCountry.answer) {
                buttonClass += "bg-green-500 text-white border-green-600";
              } else if (option === selectedAnswer) {
                buttonClass += "bg-red-500 text-white border-red-600";
              } else {
                buttonClass += "bg-gray-100 text-gray-400 border-gray-200";
              }
            } else {
              // Before answering, normal interactive buttons
              buttonClass += "bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-400 cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerClick(option)}
                disabled={showFeedback}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {/* WHY: Let user know if they got it right or wrong */}
        {showFeedback && (
          <div className={`text-center p-4 rounded-xl mb-6 ${
            selectedAnswer === currentCountry.answer 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <p className="text-xl font-semibold">
              {selectedAnswer === currentCountry.answer 
                ? '✅ Correct! Well done!' 
                : `❌ Wrong! The answer is ${currentCountry.answer}`}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        {/* WHY: Allow user to go back or proceed to next question */}
        {showFeedback && (
          <div className="flex gap-4">
            {/* Back button - only show if not on first question */}
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-600 transition-colors shadow-lg"
              >
                ← Back
              </button>
            )}
            
            {/* Next button */}
            <button
              onClick={handleNext}
              className="flex-1 bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              {currentQuestion + 1 < shuffledCountries.length ? 'Next Question →' : 'See Results 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}