import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Tables.css";

function CFproblens() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get(
                    "https://codeforces.com/api/contest.list?gym=false"
                );
                const activeContests = response.data.result.filter(
                    (contest) =>
                        contest.phase === "BEFORE" || contest.phase === "CODING"
                );
                setContests(activeContests);
            } catch (error) {
                setError("Erro ao carregar as competições.");
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    return (
        <div className="general">
            <Header />
            <div className="container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <table className="contest-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Start</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest) => (
                                <tr key={contest.id}>
                                    <td>{contest.id}</td>
                                    <td>
                                        <a
                                            href={`https://codeforces.com/contests/${contest.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {contest.name}
                                        </a>
                                    </td>
                                    <td>
                                        {new Date(
                                            contest.startTimeSeconds * 1000
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default  CFproblens;
