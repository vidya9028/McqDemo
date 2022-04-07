import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { decode as HtmlDecode } from "html-entities";

export default function McqTest({
    mcqs,
    setTestScreen,
    setTestResultScreen,
    setTestResult,
}) {
    const [score, setScore] = useState(0);
    let prev_id = "";
    let mcqsData = mcqs.map((item) => {
        item.question = HtmlDecode(item.question);
        item.options = [item.correct_answer, ...item.incorrect_answers].sort(
            () => 0.5 - Math.random()
        );
        return item;
    });
    function clickHandler(id, answer) {
        let res = mcqsData.filter((data) => id === data.id);
        if (
            res.length > 0 &&
            res[0].correct_answer === answer &&
            prev_id != id
        ) {
            setScore(score + 1);
            prev_id = id;
        }
    }

    function handleSubmit() {
        const data = { score: score };
        Inertia.post("setMcqData", data);
        setTestScreen(false);
        setTestResultScreen(true);
        setTestResult(score);
    }

    return (
        <>
            <div className="flex item-center justify-center">
                {mcqs.length > 0 ? (
                    <div className="mt-10 overflow-auto">
                        {mcqsData.map((item, index) => (
                            <div>
                                <h1
                                    key={item.id}
                                    className="flex flex-col justify-evenly"
                                >
                                    {index + 1}
                                    {"."} {item.question}
                                </h1>
                                {item.options.map((option, index) => (
                                    <p
                                        className="ml-6 hover:bg-sky-500 hover:ring-sky-500"
                                        onClick={(option) =>
                                            clickHandler(
                                                item.id,
                                                option.target.innerText
                                            )
                                        }
                                        key={index}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        ))}
                        <div className="flex item-content justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-8"
                                onClick={handleSubmit}
                            >
                                Submit Test
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span
                            className="item-center justify-center mt-10"
                            style={{ color: "red" }}
                        >
                            Please select different difficulty
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
