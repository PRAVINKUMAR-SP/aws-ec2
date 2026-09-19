import { useEffect } from 'react';

const PageTitle = ({ title, defaultTitle = 'A2Z~cart | Premium E-commerce' }) => {
    useEffect(() => {
        document.title = title || defaultTitle;
    }, [title, defaultTitle]);

    return null; // This component doesn't render anything
};

export default PageTitle;
