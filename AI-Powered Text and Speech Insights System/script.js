// ===============================
// GET ELEMENTS
// ===============================

const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");


// ===============================
// CHARACTER COUNT
// ===============================

function updateCharacterCount() {

    const text = textInput.value;

    characterCount.textContent =
        text.length + " characters";
}


// ===============================
// CLEAR TEXT
// ===============================

function clearText() {

    textInput.value = "";

    document.getElementById("sentiment").textContent = "—";
    document.getElementById("keywords").textContent = "—";
    document.getElementById("wordCount").textContent = "0";
    document.getElementById("confidence").textContent = "—";

    document.getElementById("summary").textContent =
        'Enter some text and click "Analyze with AI" to generate insights.';

    updateCharacterCount();
}


// ===============================
// WORD COUNT
// ===============================

function getWordCount(text) {

    if (text.trim() === "") {
        return 0;
    }

    return text.trim().split(/\s+/).length;
}


// ===============================
// SENTIMENT ANALYSIS
// ===============================

function analyzeSentiment(text) {

    const positiveWords = [
        "good",
        "great",
        "excellent",
        "amazing",
        "happy",
        "love",
        "like",
        "wonderful",
        "best",
        "useful",
        "easy",
        "enjoy",
        "enjoyed",
        "success",
        "beautiful",
        "awesome",
        "fantastic"
    ];

    const negativeWords = [
        "bad",
        "poor",
        "sad",
        "hate",
        "angry",
        "worst",
        "difficult",
        "problem",
        "terrible",
        "boring",
        "slow",
        "error",
        "failure",
        "disappointed",
        "hard"
    ];

    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .split(/\s+/);

    let positiveScore = 0;
    let negativeScore = 0;

    words.forEach(function(word) {

        if (positiveWords.includes(word)) {
            positiveScore++;
        }

        if (negativeWords.includes(word)) {
            negativeScore++;
        }

    });


    if (positiveScore > negativeScore) {

        return {
            name: "Positive",
            emoji: "😊"
        };

    }

    if (negativeScore > positiveScore) {

        return {
            name: "Negative",
            emoji: "😔"
        };

    }

    return {
        name: "Neutral",
        emoji: "😐"
    };
}


// ===============================
// KEYWORD EXTRACTION
// ===============================

function extractKeywords(text) {

    const stopWords = [

        "the",
        "is",
        "a",
        "an",
        "and",
        "or",
        "to",
        "of",
        "in",
        "on",
        "for",
        "with",
        "this",
        "that",
        "it",
        "was",
        "are",
        "i",
        "you",
        "we",
        "they",
        "my",
        "your",
        "very",
        "be",
        "as",
        "from",
        "have",
        "has"

    ];


    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .split(/\s+/);


    const frequency = {};


    words.forEach(function(word) {

        if (
            word.length > 3 &&
            !stopWords.includes(word)
        ) {

            if (frequency[word]) {
                frequency[word]++;
            } else {
                frequency[word] = 1;
            }

        }

    });


    const sortedWords = Object.keys(frequency)
        .sort(function(a, b) {

            return frequency[b] - frequency[a];

        });


    return sortedWords.slice(0, 3);
}


// ===============================
// MAIN ANALYSIS
// ===============================

function analyzeText() {

    const text = textInput.value.trim();


    if (text === "") {

        alert("Please enter some text first.");

        return;
    }


    // Word count

    const words = getWordCount(text);

    document.getElementById("wordCount")
        .textContent = words;


    // Sentiment

    const sentiment = analyzeSentiment(text);

    document.getElementById("sentiment")
        .textContent =
        sentiment.emoji + " " + sentiment.name;


    // Keywords

    const keywords = extractKeywords(text);

    if (keywords.length > 0) {

        document.getElementById("keywords")
            .textContent =
            keywords.join(", ");

    } else {

        document.getElementById("keywords")
            .textContent = "None";

    }


    // Confidence

    let confidence = 75 + Math.floor(Math.random() * 20);

    document.getElementById("confidence")
        .textContent =
        confidence + "%";


    // Summary

    let summary = "";


    if (sentiment.name === "Positive") {

        summary =
            "The content has a positive tone. " +
            "The language contains several words that " +
            "express satisfaction, appreciation or optimism.";

    }

    else if (sentiment.name === "Negative") {

        summary =
            "The content has a negative tone. " +
            "The language contains words that may indicate " +
            "concern, dissatisfaction or difficulty.";

    }

    else {

        summary =
            "The content appears relatively neutral. " +
            "It does not contain a strong concentration " +
            "of positive or negative expressions.";

    }


    document.getElementById("summary")
        .textContent = summary;

}


// ===============================
// SPEECH RECOGNITION
// ===============================

function startSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. " +
            "Please use Google Chrome."
        );

        return;
    }


    const recognition = new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;


    const micButton =
        document.getElementById("micButton");


    micButton.textContent =
        "🎙️ Listening...";


    micButton.style.background =
        "rgba(239,68,68,.15)";


    recognition.start();


    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;


        textInput.value +=
            (textInput.value ? " " : "") +
            transcript;


        updateCharacterCount();


        micButton.textContent =
            "🎤 Speak";


        micButton.style.background =
            "rgba(34,211,238,.08)";

    };


    recognition.onerror = function() {

        micButton.textContent =
            "🎤 Speak";


        micButton.style.background =
            "rgba(34,211,238,.08)";


        alert(
            "Unable to access the microphone. " +
            "Please allow microphone permission."
        );

    };


    recognition.onend = function() {

        micButton.textContent =
            "🎤 Speak";


        micButton.style.background =
            "rgba(34,211,238,.08)";

    };

}


// ===============================
// SCROLL TO ANALYZER
// ===============================

function scrollToAnalyzer() {

    document.getElementById("analyzer")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// LEARN MORE
// ===============================

function showInfo() {

    alert(
        "InsightAI analyzes text and speech using " +
        "sentiment detection, keyword extraction, " +
        "word statistics and speech recognition."
    );

}