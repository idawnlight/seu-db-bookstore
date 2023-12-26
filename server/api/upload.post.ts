export default defineEventHandler(async (event) => {
    const form = await readMultipartFormData(event);
    if (!form) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }
    const file = form.find((item) => item.name === "file");
    if (!file || !file.data || !file.type?.startsWith("image/")) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    let upload = new FormData();
    upload.append("smfile", new Blob([file.data], { type: file.type }));
    
    const res = await fetch("https://smms.app/api/v2/upload", {
        method: "POST",
        headers: {
            "Authorization": `${process.env.SMMS_TOKEN}`
        },
        body: upload
    });
    const data = await res.json();
    if (data.code === 'image_repeated') {
        return {
            status: 200,
            data: {
                url: data.images
            }
        };
    } else if (data.code !== "success") {
        return {
            status: 500,
            error: "Internal Server Error",
        };
    }

    return {
        status: 200,
        data: {
            url: data.data.url
        }
    };
});
