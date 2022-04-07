import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function AdminDashboard(props) {
    const [showTable, setTable] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        if (props.data != undefined) {
            setTable(true);
        }
    }, [props.data]);

    function handleSubmit() {
        Inertia.get("getMcqData");
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {showTable ? (
                                <>
                                    <h1 style={{ fontWeight: "bold" }}>
                                        Candidate Results
                                    </h1>
                                    <div className="flex item-end justify-end">
                                        <input
                                            type="text"
                                            id="search"
                                            placeholder="Search..."
                                            name="search"
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            style={{
                                                height: "39px",
                                                width: "40px",
                                                position: "absolute",
                                            }}
                                        >
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="mt-10">
                                        <table className="min-w-full border text-center">
                                            <thead className="border-b">
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Name</th>
                                                    <th>Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.data
                                                    .filter((item) => {
                                                        if (search === "") {
                                                            return item;
                                                        } else if (
                                                            item.name === search
                                                        ) {
                                                            return item;
                                                        }
                                                    })
                                                    .map((data1) => (
                                                        <tr
                                                            key={data1.id}
                                                            className="border-b"
                                                        >
                                                            <td>{data1.id}</td>
                                                            <td>
                                                                {data1.name}
                                                            </td>
                                                            <td>
                                                                {data1.score}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-8"
                                        onClick={handleSubmit}
                                    >
                                        Check Candidates
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
