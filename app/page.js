export default function Home() {
    return (
        <main>
            <h1>Welcome to Next.js</h1>
            <h2>CEO</h2>
            <a href="http://localhost:3000/api/daily_plan?todos=Brush+teeth,+eat+breakfast,+go+to+work">Daily Plan</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=personal+mental+health+apps">Market Report - mental health apps</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=todo+apps+for+adhd&requester=ceo">Market Report - todo apps for adhd</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=calendar+apps+for+adhd&requester=ceo">Market Report - calendar apps adhd</a><br />

            <h2>UX Researcher</h2>
            <a href="http://localhost:3000/api/daily_plan?todos=Brush+teeth,+eat+breakfast,+go+to+work&agent=ux_researcher">Daily Plan</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=personal+mental+health+apps&agent=ux_researcher">Market Report - mental health apps</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=todo+apps+for+adhd&agent=ux_researcher">Market Report - todo apps for adhd</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=calendar+apps+for+adhd&agent=ux_researcher">Market Report - calendar apps adhd</a><br />

            <h2>CMO</h2>
            <a href="http://localhost:3000/api/daily_plan?todos=Brush+teeth,+eat+breakfast,+go+to+work&requester=cmo">Daily Plan</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=personal+mental+health+apps&requester=cmo">Market Report - mental health apps</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=todo+apps+for+adhd&requester=cmo">Market Report - todo apps for adhd</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=calendar+apps+for+adhd&requester=cmo">Market Report - calendar apps adhd</a><br />

            <h2>CPO</h2>
            <a href="http://localhost:3000/api/daily_plan?todos=Brush+teeth,+eat+breakfast,+go+to+work&requester=cpo">Daily Plan</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=personal+mental+health+apps&requester=cpo">Market Report - mental health apps</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=todo+apps+for+adhd&requester=cpo">Market Report - todo apps for adhd</a><br />
            <a href="http://localhost:3000/api/marketing_report?topic=calendar+apps+for+adhd&requester=cpo">Market Report - calendar apps adhd</a><br />


        </main>
    )
}