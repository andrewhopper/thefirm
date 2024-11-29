'use client';
import { useState } from 'react';
import { ReportArtifact } from '../src/artifacts/artifacts';

async function fetchMarketingReport(topic: string, requester: string, dryrun = false) {
    const response = await fetch(`/api/marketing_report?topic=${encodeURIComponent(topic)}&requester=${requester}&dryrun=${dryrun}`);
    const data = await response.json();
    return data;
}

function useMarketingReport() {
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getReport = async (topic: string, requester: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchMarketingReport(topic, requester);
            setReport(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { report, loading, error, getReport };
}


export default function Home() {
    const { report, loading, error, getReport } = useMarketingReport();
    return (
        <>
        <h1>Welcome to Next.js </h1>
            < h2 > CEO </h2>

            < div >
            <button
                    onClick={ () => getReport('personal mental health apps', 'ceo') }
    disabled = { loading }
        >
        Get Marketing Report
            </button>
    { loading && <p>Loading...</p> }
    { error && <p>Error: { error } </p> }
    </div>

    {
        report && (
            <div>
            {(() => {
                try {
                    const parsedResult = JSON.parse(report.result);
                    return (
                        <>
                        <h3>Report Results </h3>
                            < div >
                            <h4>Prompt: </h4>
                                < pre > { report.prompt } </pre>
                                </div>
                                < div >
                                <h4>Type: { report.result_type } </h4>
                                    </div>
                                    < div >
                                    <h4>Results: </h4>
                                        <pre>
                    {
                        (() => {
                            // Cast the parsed JSON to the appropriate type based on result_type
                            return JSON.stringify(parsedResult, null, 2);
                        })()
                    }
                    </pre>
                        </div>
                        </>
                            );
    } catch (error) {
        return <div>Error parsing report: { error.message } </div>;
    }
}) ()}
</div>
            )}

</>
    )
}