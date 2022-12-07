import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { FlashCardList } from "./components/FlashCardList";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASH);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function decodeString(str) {
    const testArea = document.createElement("textarea");
    testArea.innerHTML = str;
    return testArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue="10"
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashcards} />
      </div>
    </>
  );
}

const SAMPLE_FLASH = [
  {
    id: 1,
    question: "What is 2 + 2 ?",
    answer: "4",
    options: ["2", "3", "5", "6"],
  },
  {
    id: 2,
    question: "What is 2 + 7?",
    answer: "9",
    options: ["7", "4", "8", "6"],
  },
  {
    id: 3,
    question: "What is 2 + 4?",
    answer: "6",
    options: ["9", "3", "5", "7"],
  },
  {
    id: 4,
    question: "What is 6 + 4?",
    answer: "10",
    options: ["8", "11", "15", "14"],
  },
  {
    id: 5,
    question: "What is 3 + 4?",
    answer: "7",
    options: ["17", "3", "15", "6"],
  },
  {
    id: 6,
    question: "What is 1 + 4?",
    answer: "5",
    options: ["6", "3", "4", "7"],
  },
  {
    id: 7,
    question: "What is 7 + 4?",
    answer: "11",
    options: ["12", "13", "15", "6"],
  },
];
export default App;
