const bloomUrl = "https://api-inference.huggingface.co/models/bigscience/bloom";
const apiKey = "Bearer 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";
let story ;
window.onload = () => {
    story = qs("textarea");
}

async function gen(msg){
    if(!story.value.length) return;
    qs("button").dataset.state = "loading";
    story.value += await query(story.value);
    qs("button").dataset.state = "idle";
}

async function query(data) {
    const response = await fetch(bloomUrl,{
        method : "POST",
        headers: new Headers({
            'content-type' : 'application/json',
            'Authorization': apiKey
        }),
        body: JSON.stringify({
            inputs:data,
            parameters:{
                max_new_token:250,
                return_full_text:false
            }
        }),
    });
    
    const result = await response.json();
    try{
        return result[0].generated_text;
    } catch(e) {
        console.log(e.message)
        console.log(JSON.stringify(result));
    }
}
