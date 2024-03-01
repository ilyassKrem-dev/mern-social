import { fetchUserByUsername } from "@/lib/actions/user.action";

export default async function Content({ content }: { content: {
    text:string;
    images:string[]
}}) {
    const parseContent = async (content: string) => {
        const regex = /@(\w+)/g;
        let parsedContent = content;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
            const username = match[1];
            const user = await fetchUserByUsername(username.toLowerCase());
            const userId = user?.id;

            if (userId) {
                const link = `<a href="/profile/${userId}" style="color:cyan;text-decoration:underline;opacity:1;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';">@${username}</a>`;
                parsedContent = parsedContent.replace(`@${username}`, link);
            }
        }

        return parsedContent;
    };

    const renderContent = async (content: string) => {
        const parsedContent = await parseContent(content);
        return { __html: parsedContent || "" };
    };
    
   
    // Resolve the Promise before returning JSX
    const renderedContent = await renderContent(content?.text || "");
    
    return (
        <p className="mt-2 text-small-regular text-light-2" dangerouslySetInnerHTML={renderedContent} />
    )
}
