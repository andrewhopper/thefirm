
'use client';
import React from 'react';
import * as artifacts from '../src/artifacts/artifacts';

interface RenderArtifactProps {
    type: string;
    body: object;
}

export function renderArtifact(type: string, body: string) {
    return (
        <div>
            <h1>{type}</h1>
            <div>{JSON.stringify(body)}</div>
        </div>
    );
}


const RenderArtifact = ({ type, body }: RenderArtifactProps) => {

    // if (type === "MemoArtifact") {
    //     let artifact = body as artifacts.MemoArtifact;
    //     return renderArtifact(type, artifact.memo);
    // }
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
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{type}</h2>
                <div>{artifact.name}</div>
                <div>{JSON.stringify(artifact.sections)}</div>



                {/* {artifact.sections.map((section: artifacts.ReportSection, index: number) => (
                    <>
                        <div key={index}>{section.name}</div>
                        <div>
                            {section.section_content.map((content: artifacts.ReportSectionContent, index: number) => (
                                <>
                                    <h4 key={index}>{content.name}</h4>
                                    <div key={index}>{content.content}</div>
                                </>
                            ))}
                        </div>
                    </>
                ))} */}
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