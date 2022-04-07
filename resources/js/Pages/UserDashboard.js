import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { TextField, MenuItem } from "@material-ui/core";
import McqTest from "./McqTest";
import { v4 as uuid } from "uuid";

export default function UserDashboard(props) {
    const [testScreen, setTestScreen] = useState(false);
    const [testResultScreen, setTestResultScreen] = useState(false);
    const [testResult, setTestResult] = useState(0);
    const url = "https://opentdb.com/api.php?amount=10";
    const [testData, setTestData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [difficultyTypes, setDificulty] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [mcqs, setMcqs] = useState([]);

    useEffect(() => {
        setCategories([...new Set(testData.map((item) => item.category))]);
        setDificulty([...new Set(testData.map((item) => item.difficulty))]);
    }, [testData]);

    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setTestData(data.results);
    }, [url]);

    function handleClick() {
        setTestScreen(true);
        setMcqs(
            testData
                .filter(
                    (data) =>
                        data.category === selectedCategory &&
                        data.difficulty === selectedDifficulty
                )
                .map((data) => ({ id: uuid(), ...data }))
        );
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {testScreen ? (
                <>
                    <McqTest
                        mcqs={mcqs}
                        setTestScreen={setTestScreen}
                        setTestResultScreen={setTestResultScreen}
                        setTestResult={setTestResult}
                    ></McqTest>
                </>
            ) : (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {testResultScreen ? (
                                    <div className="flex item-center justify-center mt-10">
                                        your Test Result Is: {testResult}
                                    </div>
                                ) : (
                                    <>
                                        <span>
                                            Hello {props.auth.user.name}, Best
                                            of luck for the test! Please select
                                            your test before you start
                                        </span>
                                        <div>
                                            <div className="flex flex-col justify-evenly p-20 w-100 mb-4 ">
                                                <TextField
                                                    select
                                                    label="Select Category"
                                                    variant="outlined"
                                                    style={{ marginBottom: 30 }}
                                                    onChange={(e) =>
                                                        setSelectedCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={selectedCategory}
                                                >
                                                    {categories.map(
                                                        (category) => (
                                                            <MenuItem
                                                                key={category}
                                                                value={category}
                                                            >
                                                                {category}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </TextField>
                                                <TextField
                                                    select
                                                    label="Select Dificulty"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        setSelectedDifficulty(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={selectedDifficulty}
                                                >
                                                    {difficultyTypes.map(
                                                        (difficulty) => (
                                                            <MenuItem
                                                                key={difficulty}
                                                                value={
                                                                    difficulty
                                                                }
                                                            >
                                                                {difficulty}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </TextField>
                                            </div>
                                            <button
                                                className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-8"
                                                type="button"
                                                onClick={handleClick}
                                            >
                                                Start Test
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Authenticated>
    );
}
