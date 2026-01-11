// Netlify Function to fetch Blogger posts via Google Blogger API
// Requires environment variables BLOG_ID and API_KEY

exports.handler = async function (event, context) {
    const blogId = process.env.BLOG_ID;
    const apiKey = process.env.API_KEY;

    console.log('=== Blogger API Function Called ===');
    console.log('Blog ID exists:', !!blogId);
    console.log('API Key exists:', !!apiKey);

    if (!blogId || !apiKey) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Missing environment variables',
                hasBlogId: !!blogId,
                hasApiKey: !!apiKey,
                message: 'Check your .env file has BLOG_ID and API_KEY'
            })
        };
    }

    // Fetch all posts (published + drafts) - easier to test
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

    console.log('Fetching URL:', url.replace(apiKey, 'API_KEY_HIDDEN'));

    try {
        const response = await fetch(url);
        const responseText = await response.text();

        console.log('Response status:', response.status);
        console.log('Response headers:', JSON.stringify(response.headers.raw()));
        console.log('Response body preview:', responseText.substring(0, 300));

        if (!response.ok) {
            console.error('API Error Response:', responseText);
            return {
                statusCode: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Blogger API returned an error',
                    status: response.status,
                    statusText: response.statusText,
                    details: responseText,
                    blogId: blogId,
                    hint: response.status === 403
                        ? 'API key might not have Blogger API enabled. Check Google Cloud Console.'
                        : response.status === 404
                            ? 'Blog ID not found. Check your BLOG_ID value.'
                            : 'Unknown error from Blogger API'
                })
            };
        }

        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseErr) {
            console.error('JSON Parse Error:', parseErr);
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Response is not valid JSON',
                    responsePreview: responseText.substring(0, 500),
                    parseError: parseErr.message
                })
            };
        }

        console.log('Success! Found', data.items?.length || 0, 'posts');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.error('Function execution error:', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Function execution failed',
                message: err.message,
                stack: err.stack?.substring(0, 500)
            })
        };
    }
};
