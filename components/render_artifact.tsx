'use client';
import React from 'react';
import * as artifacts from '../src/artifacts/artifacts';
import { appendFileSync } from 'fs';

interface RenderArtifactProps {
    type: string;
    body: object;
}

function logToFile(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;
    appendFileSync('render-artifact.log', logMessage);
}

const RenderArtifact = ({ type, body }: RenderArtifactProps) => {
    return (
        <div>
            <h1>{type}</h1>
            <pre>{JSON.stringify(body)}</pre>
            {/* {Object.keys(body).map((key) => (
                <div key={key}>
                    <b>{key}:</b> {(body as any)[key]}
                </div>
            ))} */}
        </div>
    );
    if (type === "LinkedInPost") {
        let artifact = JSON.parse(body) as artifacts.LinkedInPost;
        return renderArtifact(type, artifact.post);
    }
    if (type === "TwitterPost") {
        let artifact = JSON.parse(body) as artifacts.TwitterPost;
        return renderArtifact(type, artifact.post);
    }
    if (type === "EmailMessageArtifact") {
        let artifact = JSON.parse(body) as artifacts.EmailMessageArtifact;
        return renderArtifact(type, artifact.subject + "\n\n" + artifact.body);

    }
    if (type === "ReportArtifact" || type === "ResearchArtifact") {
        let artifact = JSON.parse(body) as artifacts.ReportArtifact;
        logToFile(`Rendering ${type} - Name: ${artifact.name}`);
        logToFile(`Sections data: ${JSON.stringify(artifact.sections)}`);

        return (
            <div>
                <h3>{type}</h3>
                <div>{artifact.name}</div>
                <div>{artifact.sections as artifacts.ReportSection[]}</div>
            </div>
        );
    }
    if (type === "MemoArtifact") {
        let artifact = JSON.parse(body) as artifacts.MemoArtifact;
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{type}</h2>
                <div>{artifact.title}</div>
                <div>{artifact.memo}</div>
            </div>
        );
    }
    if (type === "BrandStyleGuide") {
        let artifact = JSON.parse(body) as artifacts.BrandStyleGuide;
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{type}</h2>
                <div>{artifact.color_palette}</div>
                <div>{JSON.stringify(artifact.logo)}</div>
            </div>
        );
    }
    if (type === "Brand") {
        let artifact = JSON.parse(body) as artifacts.Brand;
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{type}</h2>
                <div>{artifact.name}</div>
                <div>{artifact.tone_of_voice}</div>
                <div>{artifact.brand_voice}</div>
                <div>{artifact.brand_promise}</div>
                <div>{artifact.brand_personality}</div>

            </div>
        );
    }

}

export default RenderArtifact;