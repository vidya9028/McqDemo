import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Login from "./Auth/Login";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div >
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link
                            href={route("userDashboard")}
                            className="text-sm text-gray-700 underline"
                        >
                           User Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("register")}
                                className="ml-4 text-base text-gray-700 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div>
                    <Login />
                </div>
            </div>
        </>
    );
}
